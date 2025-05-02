(function(django) {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Function to update field visibility based on media type selection
        function updateMediaFields(row) {
            var mediaTypeSelect = row.querySelector('select[id$="-media_type"]');
            if (!mediaTypeSelect) return;
            
            var mediaType = mediaTypeSelect.value;
            
            // Hide all media fields initially
            var imageField = row.querySelector('div.field-image');
            var videoUrlField = row.querySelector('div.field-video_url');
            var videoFileField = row.querySelector('div.field-video_file');
            var thumbnailField = row.querySelector('div.field-thumbnail');
            
            if (imageField) imageField.style.display = 'none';
            if (videoUrlField) videoUrlField.style.display = 'none';
            if (videoFileField) videoFileField.style.display = 'none';
            if (thumbnailField) thumbnailField.style.display = 'none';
            
            // Show only the relevant fields based on the selected media type
            if (mediaType === 'image' && imageField) {
                imageField.style.display = '';
            } else if (mediaType === 'video_url' && videoUrlField) {
                videoUrlField.style.display = '';
            } else if (mediaType === 'video_file') {
                if (videoFileField) videoFileField.style.display = '';
                if (thumbnailField) thumbnailField.style.display = '';
            }
        }
        
        // Initialize all forms
        function initForms() {
            // For inline forms
            document.querySelectorAll('.inline-related').forEach(function(el) {
                updateMediaFields(el);
            });
            
            // For standalone form
            document.querySelectorAll('.form-row.field-media_type').forEach(function(el) {
                var fieldset = el.closest('fieldset');
                if (fieldset) updateMediaFields(fieldset);
            });
        }
        
        // Run on page load
        initForms();
        
        // Add event listeners for media type changes
        document.addEventListener('change', function(event) {
            if (event.target.matches('select[id$="-media_type"]')) {
                updateMediaFields(event.target.closest('.inline-related') || event.target.closest('fieldset'));
            }
        });
        
        // Handle Django's formset additions with a MutationObserver
        const formsetContainer = document.querySelector('.inline-group');
        if (formsetContainer) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && node.matches('.inline-related')) {
                            updateMediaFields(node);
                        }
                    });
                });
            });
            
            observer.observe(formsetContainer, { childList: true, subtree: true });
        }
    });
})(window.django || {});
