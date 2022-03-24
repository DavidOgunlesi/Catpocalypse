from csv import list_dialects
from django.contrib import admin
from backend.models import Catdex, CustomUser, Cats, Wildcat, Moves, Matchmaking
from backend.models import ActivePlayer, Catdex, CustomUser, Cats, Wildcat
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class CustomUserAdmin(UserAdmin):
    # what to display in admin columns
    list_display = ('email','username','date_joined','last_login',
                    'is_admin','is_staff')
    
    # fields we can query the database for
    search_fields = ('email','username')

    # fields that should not be able to be changed
    readonly_fields = ('date_joined','last_login')


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class CatIndexAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Cats._meta.fields]
    
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Cats, CatIndexAdmin)
admin.site.register(Catdex)
admin.site.register(Wildcat)
admin.site.register(ActivePlayer)
admin.site.register(Moves)
admin.site.register(Matchmaking)

