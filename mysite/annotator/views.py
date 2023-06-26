from django.http import FileResponse, HttpResponse
def index(request):
    return FileResponse(open('annotator/annotate/annotate.html', 'rb'), content_type='text/html')

def test_api(request):
    print("Hello World")
    return HttpResponse("Hello World")