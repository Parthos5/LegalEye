import tensorflow as tf
from tensorflow.keras import layers

data_url = "https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2"
data_path = tf.keras.utils.get_file("LJSpeech-1.1", data_url, untar=True)
