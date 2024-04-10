import librosa
import librosa.display
import matplotlib.pyplot as plt
import joblib
import numpy as np
import os
import shutil
import random
import tensorflow as tf
from tensorflow.keras import layers,Sequential

def normalize_audio(audio):
    return librosa.util.normalize(audio) * 0.5
# Path to the audio file
audio_file = "LibriSpeech/dev-other/1650/157641/1650-157641-0015.flac"
dataset_folder = "LibriSpeech"
normalized_audio = joblib.load("LibriSpeech/dev-other/1650/157641/1650-157641-0005_normalized.joblib")
sr = 22050  # Assuming a default sampling rate of 22050 Hz, change as needed

# Load the audio file
# audio, sr = librosa.load(audio_file, sr=None)

# Display the waveform
plt.figure(figsize=(10, 4))
librosa.display.waveshow(normalized_audio, sr=sr)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.title("Audio Waveform")
plt.show()

# Listen to the audio
import IPython.display as ipd
ipd.Audio(audio_file)

def extract_mfcc(audio_data, sr):
    mfcc_features = librosa.feature.mfcc(y=audio_data, sr=sr, n_mfcc=13)
    return mfcc_features
# making the aplitude of all the audio files in range -0.5,0.5
# Iterate over all subdirectories in the dataset folder
# for root, dirs, files in os.walk(dataset_folder):
#     for file in files:
#         if file.endswith(".flac"):  # Adjust file extension if needed
#             # Load the audio file
#             audio_file = os.path.join(root, file)
#             audio, sr = librosa.load(audio_file, sr=None)
            
#             # Normalize the audio
#             normalized_audio = normalize_audio(audio)
            
#             # Save the normalized audio data using joblib
#             output_file = os.path.join(root, file.replace(".flac", "_normalized.joblib"))
#             joblib.dump(normalized_audio, output_file)

#             print("Normalized audio saved to:", output_file)

# Feature Extraction using MFCC
# def extract_mfcc_from_folder(folder_path, output_folder):
#     for root, dirs, files in os.walk(folder_path):
#         for file in files:
#             if file.endswith(".joblib"):  # Adjust file extension if needed
#                 audio_file = os.path.join(root, file)
#                 audio_data = joblib.load(audio_file)
#                 mfcc_features = extract_mfcc(audio_data,sr)
#                 output_file = os.path.join(output_folder, file.replace(".joblib", "_mfcc.joblib"))
#                 joblib.dump(mfcc_features, output_file)
                
#                 print("MFCC features saved to:", output_file)

# # Example usage
# # input_folder = "path/to/your/input/audio/folder"
# output_folder = "Features"
# extract_mfcc_from_folder(dataset_folder, output_folder)


# Splitting the data into testing,validation and training
# def split_dataset(input_folder, output_folder, train_ratio=0.8, val_ratio=0.1, test_ratio=0.1):
#     # Create output folders for training, validation, and testing sets
#     train_folder = os.path.join(output_folder, 'train')
#     val_folder = os.path.join(output_folder, 'val')
#     test_folder = os.path.join(output_folder, 'test')
#     os.makedirs(train_folder, exist_ok=True)
#     os.makedirs(val_folder, exist_ok=True)
#     os.makedirs(test_folder, exist_ok=True)

#     # Iterate over the input folder
#     for root, dirs, files in os.walk(input_folder):
#         for file in files:
#             # Adjust the file extension if needed
#             if file.endswith(".joblib"):
#                 # Randomly assign each file to train, val, or test set based on ratios
#                 rand = random.random()
#                 if rand < train_ratio:
#                     output_path = os.path.join(train_folder, file)
#                 elif rand < train_ratio + val_ratio:
#                     output_path = os.path.join(val_folder, file)
#                 else:
#                     output_path = os.path.join(test_folder, file)
                
#                 # Copy the file to the appropriate folder
#                 shutil.copy(os.path.join(root, file), output_path)
#                 print(f"File {file} copied to {output_path}")

# # Example usage
# input_folder = "Features"
# output_folder = "Final_Datasets"
# split_dataset(input_folder, output_folder)


# Function to calculate sequence length for a given audio file
def calculate_sequence_length(audio_file):
    # Load the audio file
    audio_data, sr = librosa.load(audio_file, sr=None)
    # Get the length of the audio sequence (number of time steps)
    sequence_length = len(audio_data)
    return sequence_length

# Function to calculate the maximum sequence length for a dataset
# def calculate_max_sequence_length(dataset_folder,ctr):
#     max_sequence_length = 0
#     # Iterate over all audio files in the dataset folder
#     for root, dirs, files in os.walk(dataset_folder):
#         for file in files:
#             # if file.endswith(".flac"):  # Adjust file extension if needed
#             #     audio_file = os.path.join(root, file)
#             #     # Calculate sequence length for the current audio file
#             #     sequence_length = calculate_sequence_length(audio_file)
#             #     # Update max_sequence_length if necessary
#             #     max_sequence_length = max(max_sequence_length, sequence_length)
#             ctr = ctr + 1
#     return ctr

# # dataset_folder = "path/to/your/dataset/folder"
# # max_sequence_length = calculate_max_sequence_length(dataset_folder)
# ctr = calculate_max_sequence_length(dataset_folder,0)
# print("Maximum sequence length:", ctr)

# Define the model
# def build_gru_model(input_shape, num_classes):
#     model = tf.keras.Sequential([
#         layers.Input(shape=input_shape),
#         layers.GRU(256, return_sequences=True),
#         layers.GRU(256),
#         layers.Dense(num_classes, activation='softmax')
#     ])
#     return model
# input_shape = (562480, 13)  # Adjust input shape based on your MFCC features
# num_classes = 10  # Adjust based on the number of unique words in your transcripts

# # Build the model
# model = build_gru_model(input_shape, num_classes)

# # Compile the model
# model.compile(optimizer='adam',
#               loss='sparse_categorical_crossentropy',
#               metrics=['accuracy'])

# # Print model summary
# model.summary()
# joblib.dump(model, 'compiled_gru_model.joblib')

# Function to make predictions using the model
# def load_features(testing_folder):
#     testing_features = []
#     for root, dirs, files in os.walk(testing_folder):
#         for file in files:
#             if file.endswith("_mfcc.joblib"):  # Assuming the features are stored in joblib files
#                 feature_file = os.path.join(root, file)
#                 features = joblib.load(feature_file)
#                 testing_features.append(features)
#     return testing_features

# def predict(model, features):
#     # Reshape the features if necessary (remove this line if features are already in the correct shape)
#     desired_shape = (features.shape[0], 562480, 13)

#     # Repeat each row of `features` to match the desired length
#     repeated_features = np.repeat(features, repeats=desired_shape[1] // features.shape[1], axis=0)
#     # features = np.reshape(features, (1, features.shape[0], features.shape[1]))

#     # Make predictions
#     predictions = model.predict(features)

#     # Return the predictions
#     return predictions
# # Load the compiled GRU model
# model = joblib.load('compiled_gru_model.joblib')
# # Load the compiled GRU model
# testing_folder = "Final_Datasets/test"

# # Load testing features
# testing_features = load_features(testing_folder)

# for features in testing_features:
#     # Make predictions using the model
#     predictions = predict(model, features)
    
#     # Process the predictions as needed
#     # For example, print the predicted class
#     print("Predicted class:", np.argmax(predictions))

# implementation of rnn model
# Define the model
model = Sequential([
    layers.SimpleRNN(64, input_shape=(None, 285)),  # Assuming input shape (sequence_length, num_mfcc_coefficients)
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')  # Adjust num_classes based on your dataset
])

# Compile the model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',  # Use 'categorical_crossentropy' if your labels are one-hot encoded
              metrics=['accuracy'])

# Print model summary
model.summary()