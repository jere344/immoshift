(function(django) {
    'use strict';
    
    // Use django.jQuery directly to avoid $ not defined error
    var $ = django.jQuery;
    
    $(function() {
        // Function to update field visibility based on media type selection
        function updateMediaFields(row) {
            var mediaType = $(row).find('select[id$="-media_type"]').val();
            
            // Hide all media fields initially
            $(row).find('div.field-image').hide();
            $(row).find('div.field-video_url').hide();
            $(row).find('div.field-video_file').hide();
            $(row).find('div.field-thumbnail').hide();
            
            // Show only the relevant fields based on the selected media type
            if (mediaType === 'image') {
                $(row).find('div.field-image').show();
            } else if (mediaType === 'video_url') {
                $(row).find('div.field-video_url').show();
            } else if (mediaType === 'video_file') {
                $(row).find('div.field-video_file').show();
                $(row).find('div.field-thumbnail').show();
            }
        }
        
        // Initialize all forms
        function initForms() {
            // For inline forms
            $('.inline-related').each(function() {
                updateMediaFields(this);
            });
            
            // For standalone form
            $('.form-row.field-media_type').each(function() {
                updateMediaFields($(this).closest('fieldset'));
            });
        }
        
        // Run on page load
        initForms();
        
        // Run when media type changes
        $(document).on('change', 'select[id$="-media_type"]', function() {
            updateMediaFields($(this).closest('.inline-related, fieldset'));
        });
        
        // Run when new inline form is added
        $(document).on('formset:added', function(event, $row, formsetName) {
            updateMediaFields($row);
        });
    });
})(window.django || {});
