from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from email.mime.image import MIMEImage
import os

def send_ebook_confirmation_email(recipient_email, first_name, ebook_title):
    """
    Sends an ebook confirmation email to the user
    
    Args:
        recipient_email: Email address of the recipient
        first_name: First name of the recipient
        ebook_title: Title of the downloaded ebook
    
    Returns:
        bool: True if email was sent successfully, False otherwise
    """
    try:
        subject = f'Votre Ebook Immoshift: {ebook_title}'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [recipient_email]

        # logo_path = f"{settings.SITE_URL}/static/logo.jpg"
        logo_path = None  # set to none because it sends our mail to spam
        logo_cid = 'logo_immoshift'  # Content ID for the image
        
        if settings.STATICFILES_DIRS:
            # Use the first defined static dir, assuming it's api_app/static
            base_static_path = settings.STATICFILES_DIRS[0]
            potential_logo_path = os.path.join(base_static_path, 'images', 'logo.png')
            if os.path.exists(potential_logo_path):
                logo_path = potential_logo_path

        # Prepare context for the template
        context = {
            'first_name': first_name,
            'ebook_title': ebook_title,
            'logo_cid': logo_cid if logo_path else None,  # Only pass CID if logo exists
        }

        # Generate plain text version from the template for accessibility
        text_content = f"""
Bonjour {first_name},

Merci d'avoir téléchargé notre ebook "{ebook_title}".
Vous pouvez accéder à votre ebook via le lien fourni lors de votre demande.

Si vous avez des questions, n'hésitez pas à nous contacter.

Cordialement,
L'équipe Immoshift
        """

        # Render the HTML content from the template file
        html_content = render_to_string('emails/ebook_confirmation_email.html', context)

        # Create the email message with alternatives
        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")

        # Attach the logo image if it exists
        if logo_path:
            try:
                with open(logo_path, 'rb') as f:
                    logo_data = f.read()
                img = MIMEImage(logo_data)
                img.add_header('Content-ID', f'<{logo_cid}>')  # Angle brackets are important
                img.add_header('Content-Disposition', 'inline', filename=os.path.basename(logo_path))
                msg.attach(img)
            except Exception as img_e:
                print(f"Error attaching logo image from {logo_path}: {str(img_e)}")

        # Send the email
        msg.send(fail_silently=True)
        return True
    except Exception as e:
        print(f"Error sending confirmation email to {recipient_email}: {str(e)}")
        return False

def send_admin_ebook_download_notification(ebook_download):
    """
    Sends a notification email to the admin about a new ebook download
    
    Args:
        ebook_download: EbookDownload instance with user information
        
    Returns:
        bool: True if email was sent successfully, False otherwise
    """
    try:
        admin_email = settings.ADMIN_EMAIL
        if not admin_email:
            return False
            
        ebook = ebook_download.ebook
        
        subject = f'Nouveau téléchargement de l\'ebook: {ebook.title}'
        message = f"""
        Un nouvel utilisateur a téléchargé l'ebook '{ebook.title}':
        
        Nom: {ebook_download.first_name} {ebook_download.last_name}
        Email: {ebook_download.email}
        Téléphone: {ebook_download.phone or 'Non fourni'}
        Consent email: {'Oui' if ebook_download.consent_mailing else 'Non'}
        Date: {ebook_download.download_date}
        IP: {ebook_download.ip_address or 'Inconnue'}
        """
        
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [admin_email]
        
        from django.core.mail import send_mail
        send_mail(subject, message, from_email, recipient_list, fail_silently=True)
        return True
    except (AttributeError, Exception) as e:
        print(f"Admin email notification error: {str(e)}")
        return False
