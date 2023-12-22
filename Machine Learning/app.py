import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.metrics import SparseCategoricalAccuracy
from transformers import AutoTokenizer, TFDistilBertForSequenceClassification
import gradio as gr
from PIL import Image
import pytesseract
from tensorflow.keras.layers import Flatten, Dense, BatchNormalization, Dropout

# Define custom objects
custom_objects = {
    'TFDistilBertForSequenceClassification': TFDistilBertForSequenceClassification,
    'AutoTokenizer': AutoTokenizer,
    'SparseCategoricalAccuracy': SparseCategoricalAccuracy
}

# Load the model
loaded_model = load_model('resume_classifier.h5', custom_objects=custom_objects)

# Load the saved tokenizer
tokenizer = AutoTokenizer.from_pretrained('saved_tokenizer')

# Function to perform OCR using pytesseract
def ocr_from_image(image_array):
    image = Image.fromarray(image_array)
    text = pytesseract.image_to_string(image)
    return text

# Placeholder list of label names
label_names = ['accountant', 'automation testing', 'bpo', 'banking', 'business analyst', 'chef', 'civil engineer', 'construction', 'data science', 'database', 'devops engineer', 'digital media', 'dotnet developer', 'etl developer', 'electrical engineering', 'engineering', 'hr', 'hadoop', 'healthcare', 'information technology', 'mechanical engineer', 'network security engineer', 'operations manager', 'pmo', 'sales', 'teacher', 'testing', 'web designing']

def predict_job_labels(resume_text):
    # Preprocess the text
    resume_text = tokenizer(resume_text, return_tensors='tf', truncation=True, padding='max_length', max_length=256)

    # Extract input_ids and attention_mask
    inputs = [resume_text['input_ids'], resume_text['attention_mask']]

    # Perform prediction
    prediction = loaded_model.predict(inputs)

    # Get the top 3 predictions
    top_3_predictions = tf.nn.top_k(prediction, k=3)

    # Decode the predicted labels
    predicted_labels = [label_names[i] for i in top_3_predictions.indices.numpy()[0]]
    predicted_percentages = top_3_predictions.values.numpy()[0] * 100

    # Return the predicted labels and their percentages
    return list(zip(predicted_labels, predicted_percentages))

# Define the Gradio interface
def gradio_interface(image):
    # Perform OCR to get the text from the image
    resume_text = ocr_from_image(image)

    # Predict the job labels
    predicted_labels = predict_job_labels(resume_text)

    # Return the predicted labels
    return ', '.join(f'{label}: {percentage:.2f}%' for label, percentage in predicted_labels)

iface = gr.Interface(fn=gradio_interface, inputs="image", outputs="text")
iface.launch(share=True)