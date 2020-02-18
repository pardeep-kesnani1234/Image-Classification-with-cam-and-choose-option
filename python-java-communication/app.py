# Import neccessary libraries inorder to acheive your task
import json
from werkzeug.utils import secure_filename
from flask import Flask, redirect, url_for, request, render_template
import numpy as np
import time
import cv2
import os

num = 1
# Flask utils
# Define a flask app
app = Flask(__name__)


def init_classify():
    global net, classes
    rows = open('Model/synset_words.txt').read().strip().split("\n")
    classes = [r[r.find(" ") + 1:].split(",")[0] for r in rows]
    weight = 'Model/bvlc_googlenet.caffemodel'
    arch = 'Model/bvlc_googlenet.prototxt'
    net = cv2.dnn.readNetFromCaffe(arch, weight)


init_classify()


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':

        # Capturing from camera
        # cap = cv2.VideoCapture(0)
        # ret, frame = cap.read()
        # image = cv2.flip(frame, 1)
        # cv2.imwrite("uploads/image.png", image)
        # cap.release()

        # Get the file from post request
        f = request.files['file']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        print(file_path)

        image = cv2.imread(file_path)

        # Make prediction
        blob = cv2.dnn.blobFromImage(cv2.resize(image, (224, 224),
                                                (104, 117, 123)))
        net.setInput(blob)
        prediction = net.forward()
        idxs = np.argsort(prediction[0])[::-1][0]
        label = classes[idxs]
        confidence = round(prediction[0][idxs] * 100, 2)
        comb = label + "," + str(confidence)
        return render_template('index.html',labeling=label,confidences=confidence);
    return None


'''
# save the image as a picture
@app.route('/image', methods=['POST'])
def capture():
    print("this block is executed")
    i = request.files['image']  # get the image
    f = ('%s.jpeg' % time.strftime("%Y%m%d-%H%M%S"))
    # Save the file to ./uploads
    basepath = os.path.dirname(__file__)
    file_path = os.path.join(
        basepath, 'images', secure_filename(f))
    i.save(file_path)
    print(file_path)
    image = cv2.imread(file_path)

    # Make prediction
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (224, 224),
                                            (104, 117, 123)))
    net.setInput(blob)
    prediction = net.forward()
    idxs = np.argsort(prediction[0])[::-1][0]
    label = classes[idxs]
    confidence = round(prediction[0][idxs] * 100, 2)
    comb = label + "," + str(confidence)
    print("this block is complete exectuted")
    return comb


@app.route('/image-capture', methods=['POST'])
def capture1():
    result = capture()
    print("this is the result of second funciton: " + str(result))
    return result
'''

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
