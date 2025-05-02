document.addEventListener('DOMContentLoaded', function() {
    // Get the LinkedIn URL input field
    var linkedInUrlInput = document.getElementById('id_linkedin_url');
    
    // If the field exists
    if (linkedInUrlInput) {
        // Add event listener to validate URL on change
        linkedInUrlInput.addEventListener('change', function() {
            var url = this.value;
            
            // Basic validation for LinkedIn URL
            if (url && !url.includes('linkedin.com/posts/')) {
                // Add a warning class
                this.classList.add('warning-input');
                
                // Add a warning message
                var warningDiv = document.createElement('div');
                warningDiv.className = 'url-warning';
                warningDiv.textContent = "Cette URL ne semble pas être un post LinkedIn valide. Assurez-vous que l'URL contient 'linkedin.com/posts/'.";
                warningDiv.style.color = '#c93c37';
                warningDiv.style.marginTop = '5px';
                
                // Remove any existing warning
                var existingWarning = this.parentNode.querySelector('.url-warning');
                if (existingWarning) {
                    existingWarning.remove();
                }
                
                // Add the new warning
                this.parentNode.appendChild(warningDiv);
            } else {
                // Remove warning class and message if URL appears valid
                this.classList.remove('warning-input');
                var existingWarning = this.parentNode.querySelector('.url-warning');
                if (existingWarning) {
                    existingWarning.remove();
                }
            }
        });
    }
});
