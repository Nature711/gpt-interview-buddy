from flask import Flask, request, jsonify
import PyPDF2
import io
import json

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    reader = PyPDF2.PdfReader(file.stream)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return jsonify({"text": text})

with open('prompts.json') as json_file:
    prompts = json.load(json_file)

@app.route('/getPrompt', methods=['POST'])
def get_prompt():
    action = request.json.get('action')
    prompt = prompts.get(action, "Unknown action")
    return jsonify({"prompt": prompt})

if __name__ == '__main__':
    app.run(port=5000)
