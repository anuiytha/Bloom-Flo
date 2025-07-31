import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useAuth } from '../contexts/authContext/index';

const storage = getStorage();

export default function VisionBoard() {
    const [images, setImages] = useState([]);
    const [savedImages, setSavedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const { currentuser } = useAuth();

    // Load saved images on component mount
    useEffect(() => {
        if (currentuser) {
            loadSavedImages();
        }
    }, [currentuser]);

    const loadSavedImages = async () => {
        try {
            const userVisionBoardRef = ref(storage, `visionBoards/${currentuser.uid}/`);
            const result = await listAll(userVisionBoardRef);

            const imageUrls = await Promise.all(
                result.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return {
                        id: item.name,
                        url: url,
                        isSaved: true
                    };
                })
            );

            setSavedImages(imageUrls);
        } catch (error) {
            console.error("Error loading saved images:", error);
        }
    };

    const handleUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        selectedFiles.forEach(file => {
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, {
                        id: Date.now() + Math.random(),
                        url: reader.result,
                        file: file,
                        isSaved: false
                    }]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleSave = async () => {
        if (images.length === 0) return;
        setUploading(true);

        try {
            const savedImageUrls = [];

            for (let image of images) {
                const fileName = `${Date.now()}_${image.file.name}`;
                const storageRef = ref(storage, `visionBoards/${currentuser.uid}/${fileName}`);
                await uploadBytes(storageRef, image.file);
                const url = await getDownloadURL(storageRef);

                savedImageUrls.push({
                    id: fileName,
                    url: url,
                    isSaved: true
                });

                console.log("Uploaded to:", url);
            }

            // Add saved images to savedImages state
            setSavedImages(prev => [...prev, ...savedImageUrls]);

            // Clear the temporary images
            setImages([]);

            setUploading(false);
            alert("Vision Board saved successfully! ✨");
        } catch (error) {
            console.error("Upload error:", error);
            setUploading(false);
        }
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const removeSavedImage = (id) => {
        setSavedImages(prev => prev.filter(img => img.id !== id));
    };

    // Combine temporary and saved images for display
    const allImages = [...images, ...savedImages];

    return (
        <div className="vision-board-container">
            <div className="vision-board-header">
                <h2 className="vision-board-title">🌸 Vision Board</h2>
                <p className="vision-board-subtitle">Upload your dreams and aspirations</p>
            </div>

            {/* Upload Section */}
            <div className="upload-section">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    className="file-input"
                    id="vision-board-upload"
                />
                <label htmlFor="vision-board-upload" className="upload-button">
                    📸 Add Images to Your Vision Board
                </label>
            </div>

            {/* Vision Board Grid */}
            {allImages.length > 0 && (
                <div className="vision-board-grid">
                    {allImages.map((image, index) => (
                        <div key={image.id} className="image-container">
                            <img
                                src={image.url}
                                alt={`Vision ${index + 1}`}
                                className="vision-image"
                            />
                            <button
                                onClick={() => image.isSaved ? removeSavedImage(image.id) : removeImage(image.id)}
                                className="remove-button"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Save Button */}
            {images.length > 0 && (
                <div className="save-section">
                    <button
                        onClick={handleSave}
                        disabled={uploading}
                        className={`save-button ${uploading ? 'uploading' : ''}`}
                    >
                        {uploading ? "Saving Your Dreams..." : "Save Vision Board ✨"}
                    </button>
                </div>
            )}

            {/* Empty State */}
            {allImages.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🎨</div>
                    <p>Start building your vision board by uploading images that inspire you!</p>
                </div>
            )}
        </div>
    );
}
