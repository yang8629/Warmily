import { Asset } from 'expo-asset';

export default function CacheAssetsAsync({
    images = [],
    videos = [],
}) {
    return Promise.all([
        ...cacheImages(images),
        ...cacheVideos(videos),
    ]);
}

function cacheImages(images) {
    return images.map(image => Asset.fromModule(image).downloadAsync());
}

function cacheVideos(videos) {
    return videos.map(video => Asset.fromModule(video).downloadAsync());
}