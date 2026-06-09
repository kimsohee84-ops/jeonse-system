from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        result = json.dumps({"status": "ok", "message": "Python API 작동 중"}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(result)))
        self.end_headers()
        self.wfile.write(result)

    def do_POST(self):
        try:
            import openpyxl
            result = json.dumps({"status": "ok", "openpyxl": openpyxl.__version__}).encode()
        except Exception as e:
            result = json.dumps({"status": "error", "message": str(e)}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(result)))
        self.end_headers()
        self.wfile.write(result)
