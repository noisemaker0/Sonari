import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const BACKEND_URL = 'http://localhost:5000/api/upload/audio';

const UploadSongScreen = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [explicit, setExplicit] = useState(false);

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
  const ALLOWED_TYPES = [
    'audio/mpeg',
    'audio/wav',
    'audio/x-wav',
    'audio/flac',
    'audio/x-flac',
  ];

  const pickFile = async () => {
    setMessage('');
    const result = await DocumentPicker.getDocumentAsync({
      type: ALLOWED_TYPES,
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === 'success') {
      if (!ALLOWED_TYPES.includes(result.mimeType)) {
        setFile(null);
        setMessage('Invalid file type. Only MP3, WAV, FLAC allowed.');
        return;
      }
      if (result.size && result.size > MAX_FILE_SIZE) {
        setFile(null);
        setMessage('File is too large. Max size is 20MB.');
        return;
      }
      setFile(result);
    } else {
      setFile(null);
    }
  };

  // Actual upload handler
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an audio file.');
      return;
    }
    if (!title) {
      setMessage('Please enter a song title.');
      return;
    }
    setUploading(true);
    setProgress(0);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('audio', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'audio/mpeg',
      });
      // Use XMLHttpRequest for progress
      const xhr = new XMLHttpRequest();
      xhr.open('POST', BACKEND_URL);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };
      xhr.onload = async () => {
        setUploading(false);
        if (xhr.status === 201) {
          setFile(null);
          setProgress(0);
          try {
            const resp = JSON.parse(xhr.responseText);
            setMessage('Upload successful! File URL: ' + (resp.data?.url || ''));
            Alert.alert('Success', 'Song uploaded successfully!');
          } catch (e) {
            setMessage('Upload successful!');
          }
        } else {
          let errMsg = 'Upload failed';
          try {
            const resp = JSON.parse(xhr.responseText);
            errMsg = resp.message || errMsg;
          } catch {}
          setMessage(errMsg);
        }
      };
      xhr.onerror = () => {
        setUploading(false);
        setMessage('Upload failed: Network error');
      };
      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      setMessage('Upload failed: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Song</Text>
      <TextInput
        style={styles.input}
        placeholder="Song Title"
        value={title}
        onChangeText={setTitle}
        editable={!uploading}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
        editable={!uploading}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text>Explicit:</Text>
        <Button title={explicit ? 'Yes' : 'No'} onPress={() => setExplicit(!explicit)} disabled={uploading} />
      </View>
      <TouchableOpacity style={styles.button} onPress={pickFile} disabled={uploading}>
        <Text style={styles.buttonText}>Pick Audio File</Text>
      </TouchableOpacity>
      {file && (
        <Text style={styles.fileName}>
          Selected: {file.name} ({file.size ? (file.size / (1024 * 1024)).toFixed(2) : '?'} MB)
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleUpload} disabled={uploading || !file}>
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Upload'}</Text>
      </TouchableOpacity>
      {uploading && (
        <View style={styles.progressContainer}>
          <View style={{ flex: 1, height: 10, backgroundColor: '#eee', borderRadius: 5 }}>
            <View style={{ width: `${progress}%`, height: 10, backgroundColor: '#007AFF', borderRadius: 5 }} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, marginVertical: 10, width: 200, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  fileName: { marginTop: 10, fontSize: 16, color: '#333' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  progressText: { marginLeft: 10, fontSize: 16 },
  message: { marginTop: 20, fontSize: 16, color: '#007AFF', textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
});

export default UploadSongScreen;