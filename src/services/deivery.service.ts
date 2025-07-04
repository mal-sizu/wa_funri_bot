import { Client } from "@googlemaps/google-maps-services-js";

// (Other interfaces and constants like ORIGIN_LOCATION remain the same)
interface DeliveryFeeResult {
  from: string;
  to: string;
  distance_km: number;
  base_fee: number;
  pre_adjustment_fee: number; // Fee after reduction but before rounding
  final_fee: number;
}

const ORIGIN_LOCATION = 'Godagama, Western Province, Sri Lanka';

// (calculateBaseFee and adjustFinalFee functions remain exactly the same)
function calculateBaseFee(distance: number): number {
  if (distance < 0) return 0;
  if (distance <= 50) return 3000;
  if (distance <= 100) return 1000 + 40 * distance;
  return 2000 + 30 * distance;
}

function adjustFinalFee(fee: number): number {
  let roundedFee = Math.round(fee / 100) * 100;
  if (roundedFee > 6000 && roundedFee % 1000 === 0) {
    return roundedFee - 100;
  }
  return roundedFee;
}


/**
 * Gets the road distance between two locations using the Google Maps Distance Matrix API.
 * @param origin The starting location.
 * @param destination The destination location.
 * @returns A promise that resolves to the distance in kilometers.
 */
async function getRoadDistance(origin: string, destination: string): Promise<number> {
  // 1. Instantiate the Google Maps client
  const client = new Client({});

  try {
    // 2. Make the API request
    const response = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: process.env["Maps_API_KEY"]!, // Use the API key from the .env file
      },
    });

    // 3. Parse the response and handle potential errors
    const element = response.data.rows[0]?.elements[0];

    if (element?.status === "OK") {
      // The distance is provided in meters, so convert to kilometers
      const distanceInMeters = element.distance.value;
      const distanceInKm = distanceInMeters / 1000;
      console.log(`✅ Distance found: ${distanceInKm.toFixed(1)} km`);
      return distanceInKm;
    } else {
      // Handle cases where the route could not be found
      throw new Error(`Could not find a route from ${origin} to ${destination}. Status: ${element?.status || 'UNKNOWN'}`);
    }
  } catch (error) {
    console.error("Error fetching distance from Google Maps API:", error);
    // Re-throw the error to be handled by the calling function
    throw new Error("Failed to calculate distance due to an external service error.");
  }
}

/**
 * Main function to orchestrate the complete delivery fee calculation from Godagama.
 */
export async function getGodagamaDeliveryFee(destination: string): Promise<DeliveryFeeResult> {
  const distance = await getRoadDistance(ORIGIN_LOCATION, destination);
  const baseFee = calculateBaseFee(distance);

  let preAdjustmentFee: number;
  if (distance < 200) {
    preAdjustmentFee = baseFee - 2000;
  } else {
    preAdjustmentFee = baseFee - 2500;
  }

  const finalFee = adjustFinalFee(preAdjustmentFee);

  return {
    from: ORIGIN_LOCATION,
    to: destination,
    distance_km: distance,
    base_fee: baseFee,
    pre_adjustment_fee: preAdjustmentFee,
    final_fee: finalFee,
  };
}