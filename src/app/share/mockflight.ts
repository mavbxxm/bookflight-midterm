import { Flight } from "../component/flight/flight"

export class MockFlight {
  public static mFlight: Flight[] = [
    {
      fullName: "Thitikan Phokhawatthanakun",
      from: "Norway",
      to: "Finland",
      type: "Return",
      adults: 2,
      children: 1,
      infants: 0,
      departure: new Date(2565, 2, 20),
      arrival: new Date(2565, 2, 27),

    },
  ];
}
