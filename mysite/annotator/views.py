from django.http import FileResponse, HttpResponse
def index(request):
    return FileResponse(open('annotator/annotate/annotate.html', 'rb'), content_type='text/html')