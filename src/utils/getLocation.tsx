export async function getLocation(lat: string = '37.451', lng: string = '-122.18') {
    const response = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true/false`);
    // const response = await fetch(`http://api.geonames.org/findNearestAddress?lat=37.451&lng=-122.18&username=demo`);
    const result = await response.json();
    return result;
}
/**
 * dda4db35af91075c626f93913b2bb4f0

 */