import librosa
import librosa.display
import matplotlib.pyplot as plt
import joblib
import os
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
def extract_mfcc_from_folder(folder_path, output_folder):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".joblib"):  # Adjust file extension if needed
                audio_file = os.path.join(root, file)
                audio_data = joblib.load(audio_file)
                mfcc_features = extract_mfcc(audio_data,sr)
                output_file = os.path.join(output_folder, file.replace(".joblib", "_mfcc.joblib"))
                joblib.dump(mfcc_features, output_file)
                
                print("MFCC features saved to:", output_file)

# Example usage
# input_folder = "path/to/your/input/audio/folder"
output_folder = "Features"
extract_mfcc_from_folder(dataset_folder, output_folder)