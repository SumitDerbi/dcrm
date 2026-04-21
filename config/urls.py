from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    # API urls will be added here as modules are built
    # path("api/", include("api.urls")),
]

# Catch-all: serve React app for any non-API, non-admin route
urlpatterns += [
    re_path(r"^(?!api/|admin/|static/|media/).*$", TemplateView.as_view(template_name="frontend/index.html"), name="frontend"),
]

if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    try:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
    except ImportError:
        pass
