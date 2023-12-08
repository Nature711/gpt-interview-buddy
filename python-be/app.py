from flask import Flask, request, jsonify
import PyPDF2
import io

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    reader = PyPDF2.PdfReader(file.stream)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return jsonify({"text": text})

if __name__ == '__main__':
    app.run(port=5000)
