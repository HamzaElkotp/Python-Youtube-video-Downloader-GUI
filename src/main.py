import eel
import os
from pytube import YouTube
from pathlib import Path
import tkinter as tk
from tkinter import filedialog

eel.init('web')

@eel.expose
def choose_path():
    root = tk.Tk()
    root.withdraw()
    folder_selected = filedialog.askdirectory()
    return folder_selected

@eel.expose
def download_video(link, path):
    try:
        urls = link
        vid = YouTube(urls)
        video_download = vid.streams.get_highest_resolution()
        entry = YouTube(urls).title
        video_download.download(output_path=path, filename=f"{entry}.mp4")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

@eel.expose
def open_folder(path):
    path = Path(path)
    if os.name == 'nt':
        os.startfile(path)
    else:
        os.system(f'open "{path}"')

if __name__ == '__main__':
    eel.start('index.html', size=(400, 550))