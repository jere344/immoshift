import os
import time
import shutil
import datetime
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Backup SQLite database'

    def handle(self, *args, **kwargs):
        try:
            # Get database file path from settings
            db_path = settings.DATABASES['default']['NAME']
            
            # Ensure the source file exists
            if not os.path.exists(db_path):
                self.stdout.write(self.style.ERROR(f"Database file not found at {db_path}"))
                return
                
            # Format timestamp
            timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
            db_filename = os.path.basename(db_path)
            backup_name = f"{db_filename}_{timestamp}.bak"
            backup_path = os.path.join(settings.SQLITE_BACKUP_DIR, backup_name)
            
            # Wait for any potential database transactions to complete
            time.sleep(1)
            
            # Create a copy of the database
            shutil.copy2(db_path, backup_path)
            
            self.stdout.write(self.style.SUCCESS(f"Successfully backed up database to {backup_path}"))
            
            # Delete old backups
            self.cleanup_old_backups()
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Backup failed: {str(e)}"))
            logger.error(f"Database backup failed: {str(e)}")
    
    def cleanup_old_backups(self):
        """Remove backups older than BACKUP_RETENTION_DAYS"""
        retention_days = settings.BACKUP_RETENTION_DAYS
        cutoff_date = datetime.datetime.now() - datetime.timedelta(days=retention_days)
        
        backup_dir = Path(settings.SQLITE_BACKUP_DIR)
        count = 0
        
        for backup_file in backup_dir.glob('*.bak'):
            file_modified = datetime.datetime.fromtimestamp(os.path.getmtime(backup_file))
            if file_modified < cutoff_date:
                os.remove(backup_file)
                count += 1
        
        if count > 0:
            self.stdout.write(self.style.SUCCESS(f"Removed {count} old backup(s)"))