from django.http import FileResponse, HttpResponse
import subprocess
def index(request):
    return FileResponse(open('annotator/annotate/annotate.html', 'rb'), content_type='text/html')

def test_api(request):
    result = subprocess.run(['bash', 'annotator/run_model.sh'], shell=True)
    # 檢查命令是否成功執行
    if result.returncode == 0:
        print('執行成功')
        pass
    output = result.stdout
    return HttpResponse(output)