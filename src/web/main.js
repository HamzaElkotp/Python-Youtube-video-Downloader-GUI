const Interface = {
    choosePathBtn: null,
    downloadBtn: null,
    linkInput: null,
    pathInput: null,
    statusMessage: null
}
document.addEventListener("DOMContentLoaded", function() {
    Interface.choosePathBtn = document.getElementById('choose-path-btn');
    Interface.downloadBtn = document.getElementById('download-btn');
    Interface.linkInput = document.getElementById('link-input');
    Interface.pathInput = document.getElementById('path-input');
    Interface.statusMessage = document.getElementById('status-message');

    Object.freeze(Interface);

    Interface.choosePathBtn.addEventListener('click', function() {
        eel.choose_path()(function(path) {
            Interface.pathInput.value = path;
        });
    });

    Interface.downloadBtn.addEventListener('click', function() {
        const link = Interface.linkInput.value.trim();
        const path = Interface.pathInput.value.trim();
        if (!link || !path) {
            Interface.statusMessage.textContent = 'Please provide both a YouTube link and a download path.';
            return;
        }
        Interface.statusMessage.textContent = 'Downloading...';
        Interface.downloadBtn.disabled = true;
        eel.download_video(link, path)(function(success) {
            if (success) {
                Interface.statusMessage.textContent = 'Download complete!';
                eel.open_folder(path);
            } else {
                Interface.statusMessage.textContent = 'Failed to download the video.';
            }
            Interface.downloadBtn.disabled = false;
        });
    });
});
