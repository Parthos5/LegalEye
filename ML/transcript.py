import librosa
import librosa.display
import matplotlib.pyplot as plt

# Path to the audio file
audio_file = "LibriSpeech/dev-other/116/288045/116-288045-0000.flac"
# C:\Users\thosp\OneDrive\Documents\GitHub\mprsem6\ML\LibriSpeech\dev-other\116\288045\116-288045-0000.flac

# Load the audio file
audio, sr = librosa.load(audio_file, sr=None)

# Display the waveform
plt.figure(figsize=(10, 4))
librosa.display.waveshow(audio, sr=sr)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.title("Audio Waveform")
plt.show()

# Listen to the audio
import IPython.display as ipd
ipd.Audio(audio_file)