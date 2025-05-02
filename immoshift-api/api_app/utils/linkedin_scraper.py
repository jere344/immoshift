import requests
from bs4 import BeautifulSoup
from datetime import datetime
import re
import json
import tempfile
import os
from django.core.files import File
from urllib.parse import urlparse, urlencode, parse_qs

def is_linkedin_post_url(url):
    """Check if the URL is a valid LinkedIn post URL."""
    parsed_url = urlparse(url)
    return (parsed_url.netloc == 'www.linkedin.com' or parsed_url.netloc == 'linkedin.com' or 
            parsed_url.netloc.endswith('.linkedin.com')) and '/posts/' in url

def scrape_linkedin_post(url):
    """
    Scrape content from a LinkedIn post.
    
    Returns a dictionary with:
    - title: First line of the post
    - excerpt: Second line of the post or a summary
    - content: Full post content
    - image_url: URL of the first image in the post (if any)
    - published_at: Publication date of the post (if available)
    - source_url: The original LinkedIn post URL (cleaned of tracking parameters)
    - author_name: Name of the post author
    - author_headline: Headline/description of the author
    - author_image_url: URL of the author's profile image
    """
    print("Scraping LinkedIn post:", url)
    # Clean the URL by removing tracking parameters
    clean_url = url.split('?')[0] if '?' in url else url
    
    # Headers to mimic a browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    
    try:
        response = requests.get(clean_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        # Save the soup to a file for debugging
        with open('linkedin_post_debug.html', 'w', encoding='utf-8') as f:
            f.write(soup.prettify())
        
        # Extract post content by finding the attributed-text-segment-list__content
        post_content = None
        content_element = soup.select_one('.attributed-text-segment-list__content')
        if content_element:
            post_content = content_element.get_text(separator="\n").strip()
        
        if not post_content:
            # Try looking for article body in a script tag (structured data)
            for script in soup.find_all('script', type='application/ld+json'):
                try:
                    data = json.loads(script.string)
                    if 'articleBody' in data:
                        post_content = data['articleBody']
                        break
                except (json.JSONDecodeError, AttributeError):
                    continue
        
        if not post_content:
            return {
                'error': 'Could not extract content from the LinkedIn post.',
                'source_url': clean_url
            }
        
        # Split content into lines
        lines = post_content.split('\n')
        lines = [line.strip() for line in lines if line.strip()]
        
        # First line is the title
        title = lines[0] if lines else 'LinkedIn Post'
        
        # Second line is the excerpt (or first line if only one line exists)
        excerpt = lines[1] if len(lines) > 1 else title
        
        # Find the post image - look for feed-images-content list items
        image_url = None
        image_container = soup.select_one('.feed-images-content img')
        if image_container:
            image_url = image_container.get('data-delayed-url') or image_container.get('src')
        
        # If not found, try meta og:image
        if not image_url:
            meta_image = soup.select_one('meta[property="og:image"]')
            if meta_image:
                image_url = meta_image.get('content')
        
        # Try to find the date
        published_at = None
        
        # First, check ld+json data for datePublished
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                data = json.loads(script.string)
                if 'datePublished' in data:
                    published_at = datetime.fromisoformat(data['datePublished'].replace('Z', '+00:00'))
                    break
            except (json.JSONDecodeError, AttributeError, ValueError):
                continue
        
        if not published_at:
            # Try to extract from time elements
            time_elements = soup.find_all('time')
            for time_element in time_elements:
                if time_element.get('datetime'):
                    try:
                        published_at = datetime.fromisoformat(time_element['datetime'].replace('Z', '+00:00'))
                        break
                    except ValueError:
                        pass
        
        # If no exact date is found, look for relative date
        if not published_at:
            relative_time = soup.select_one('.comment__duration-since, span.text-color-text-low-emphasis time')
            if relative_time:
                relative_text = relative_time.text.strip()
                # Handle simple relative dates (approximate)
                if 'd' in relative_text:  # days like "1d"
                    days = int(relative_text.replace('d', ''))
                    published_at = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
                    # No need for timedelta as we use current date
        
        # If no date found, set to current time
        if not published_at:
            published_at = datetime.now()
        
        # Extract author information
        author_name = "Unknown Author"
        author_headline = ""
        author_image_url = None
        
        # Get author name
        author_element = soup.select_one('.base-main-feed-card__entity-lockup a.link-styled')
        if author_element:
            author_name = author_element.text.strip()
        
        # Get author headline
        headline_element = soup.select_one('.base-main-feed-card__entity-lockup p.text-color-text-low-emphasis')
        if headline_element:
            author_headline = headline_element.text.strip()
        
        # Get author image
        author_img = soup.select_one('.base-main-feed-card__entity-lockup img')
        if author_img:
            author_image_url = author_img.get('data-delayed-url') or author_img.get('src')
        
        return {
            'title': title[:197] + '...' if len(title) > 200 else title,  # Truncate title if too long
            'excerpt': excerpt[:497] + '...' if len(excerpt) > 500 else excerpt,  # Truncate excerpt if too long
            'content': post_content,
            'image_url': image_url,
            'published_at': published_at,
            'source_url': clean_url,  # Use the cleaned URL without tracking parameters
            'author_name': author_name,
            'author_headline': author_headline,
            'author_image_url': author_image_url
        }
    
    except requests.RequestException as e:
        return {
            'error': f'Failed to fetch LinkedIn post: {str(e)}',
            'source_url': clean_url
        }
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        return {
            'error': f'Error processing LinkedIn post: {str(e)}',
            'error_details': error_details,
            'source_url': clean_url
        }

def download_image_from_url(url):
    """Download image from URL and return a Django File object."""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Create a temporary file to store the image
        img_temp = tempfile.NamedTemporaryFile(delete=True)
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                img_temp.write(chunk)
        img_temp.flush()
        
        # Get file name from URL
        url_path = urlparse(url).path
        file_name = os.path.basename(url_path)
        if not file_name or '.' not in file_name:
            file_name = 'linkedin_image.jpg'
        
        return File(img_temp, name=file_name)
    
    except Exception as e:
        return None
