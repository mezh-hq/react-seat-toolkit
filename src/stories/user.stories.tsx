import SeatToolkit from "@/index";

export default {
  title: "User Mode",
  component: SeatToolkit,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {}
};

export const Default = {
  render: () => (
    <SeatToolkit
      mode={"user"}
      data={{
        name: "Type your location here",
        categories: [
          { id: "b0ae1b89-e4f7-445d-b749-c0caa56f3ee1", name: "Standard", color: "#000000", textColor: "#f7f7f7" },
          { id: "37c68982-e859-4d86-a4aa-e46edf48ba11", name: "Premium", color: "#FF0000", textColor: "#f7f7f7" },
          { id: "8f152220-f5c9-41c0-b920-dfad76c989ea", name: "VIP", color: "#0000FF", textColor: "#f7f7f7" }
        ],
        sections: [
          {
            id: "7f0cc051-703f-4897-9c08-6834d680e05b",
            name: "Section 1",
            color: "#000000",
            stroke: "#000000",
            freeSeating: true
          },
          {
            id: "0e3e85da-eb6d-4a9b-b170-e8bcf1e76739",
            name: "Section 2",
            color: "#FF0000",
            stroke: "#FF0000",
            freeSeating: false
          },
          {
            id: "4405de50-1c3f-4ab6-9b67-2a8d4eb27cbd",
            name: "Section 3",
            color: "#0000FF",
            stroke: "#0000FF",
            freeSeating: false
          }
        ],
        seats: [
          {
            id: "d8a4a495-dc5d-4138-9ad5-20125bdbf86c",
            x: 610,
            y: 299.03999999999996,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "e9802941-5dcf-49fa-8289-1c94ca135d13",
            x: 560,
            y: 299.03999999999996,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "dd7d17b0-5bd9-4284-ac1c-078df34278f9",
            x: 510,
            y: 299.03999999999996,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "54c2f616-1368-49ae-92dd-98816190b3c3",
            x: 460,
            y: 299.03999999999996,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "fb92b524-021a-4259-a7f1-0873709195da",
            x: 410,
            y: 299.03999999999996,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "d2186be2-b197-4fb1-b7b3-88b68d74f369",
            x: 360,
            y: 299.03999999999996,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "876ea631-8d27-42ee-8ac3-b683efa40495",
            x: 310,
            y: 299.03999999999996,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "f82d488e-ca69-4709-8901-4c020c6e638b",
            x: 260,
            y: 299.03999999999996,
            label: "8",
            status: "Available",
            category: null
          },
          {
            id: "b5743cd1-2f7d-48ea-828c-c289fac71c82",
            x: 210,
            y: 299.03999999999996,
            label: "9",
            status: "Available",
            category: null
          },
          {
            id: "3af354a8-fae0-4da4-b7dd-60ecf8e8accc",
            x: 160,
            y: 299.03999999999996,
            label: "10",
            status: "Available",
            category: null
          },
          {
            id: "7b756a5f-d394-4199-bcfc-759e4f4c38af",
            x: 710,
            y: 299.03999999999996,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "25bb882e-80d3-4d42-aebb-3cf4ed58d6a5",
            x: 760,
            y: 299.03999999999996,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "c2dffe1a-af11-408b-89cf-7c12b046da07",
            x: 810,
            y: 299.03999999999996,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "7b118c1e-0739-4675-a3f6-f1ae9fdcf670",
            x: 860,
            y: 299.03999999999996,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "93ff5cb9-c9c6-43d6-b950-705fe970dd74",
            x: 910,
            y: 299.03999999999996,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "734d6cd4-ef0f-4b0e-a747-26bd4681c123",
            x: 960,
            y: 299.03999999999996,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "6052add0-d745-4fb8-bccc-88bbe2300d2d",
            x: 1010,
            y: 299.03999999999996,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "dc16f7e3-a393-4fe2-a7cf-194af309bbc4",
            x: 1060,
            y: 299.03999999999996,
            label: "8",
            status: "Available",
            category: null
          },
          {
            id: "df710ea6-e12c-48e5-bd1e-da40602813a4",
            x: 1110,
            y: 299.03999999999996,
            label: "9",
            status: "Available",
            category: null
          },
          {
            id: "edaecdf1-3bbf-4c4c-a481-2541a33e8a50",
            x: 1160,
            y: 299.03999999999996,
            label: "10",
            status: "Available",
            category: null
          },
          {
            id: "760bc4e8-3b5e-4e17-b8d8-a9b5cc2e5b26",
            x: 610,
            y: 370.24,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "d8788a67-3e46-4ea4-ad67-3594e3477ab6",
            x: 560,
            y: 370.24,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "9292eae9-8b9f-4b24-aeaa-2531c42a1b66",
            x: 510,
            y: 370.24,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "0484120c-82ba-4ea3-bfc4-c066f0315f95",
            x: 460,
            y: 370.24,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "17f2222e-2b93-4947-a038-01f087d68d22",
            x: 410,
            y: 370.24,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "aa9280cc-9dd2-4ee3-9c16-444b04b3e8de",
            x: 360,
            y: 370.24,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "26c2703b-f00e-4857-9685-660dd897e74d",
            x: 310,
            y: 370.24,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "58d31e68-d0de-4c50-a638-e25b84270ddb",
            x: 710,
            y: 370.24,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "b4e2778d-f6c2-4560-86ae-266d70ae69ea",
            x: 760,
            y: 370.24,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "345bed3a-4b75-4dca-b45e-dc41534edbdd",
            x: 810,
            y: 370.24,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "b4eeeb5a-5f25-41a6-8c9a-2bb0d047d53e",
            x: 860,
            y: 370.24,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "a43053f0-e73c-40d8-b1fc-c15849f6881c",
            x: 910,
            y: 370.24,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "f13ef0fd-48b3-4a29-8cee-4047be3bcf62",
            x: 960,
            y: 370.24,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "ecad9a73-b336-43c8-8094-578599228dc3",
            x: 1010,
            y: 370.24,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "39e24865-697a-4036-ac2f-6b742547a130",
            x: 610,
            y: 441.44,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "4ee3c150-f5fa-4571-868b-606d18a13143",
            x: 560,
            y: 441.44,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "9464a549-b695-4c78-870c-fd990e44bce0",
            x: 510,
            y: 441.44,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "d5954737-4618-4d92-b057-c0003cda12ed",
            x: 460,
            y: 441.44,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "65830754-39b0-44b2-9bb5-2fd87f512427",
            x: 410,
            y: 441.44,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "74f2bebf-442f-4a5f-bf73-e63c3edf9be4",
            x: 710,
            y: 441.44,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "45b3afa9-e9e8-49d0-9cf5-464f837ea606",
            x: 760,
            y: 441.44,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "81913490-edff-4bd9-a0dd-f5639f959856",
            x: 810,
            y: 441.44,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "ed5c7deb-3727-4697-afb7-1e95a44549e8",
            x: 860,
            y: 441.44,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "c2e1cad5-83fa-4f90-bd92-a0913e787728",
            x: 910,
            y: 441.44,
            label: "5",
            status: "Available",
            category: null
          }
        ],
        booths: [
          { id: "85fb6458-d65e-410b-9c73-cb37e4f83276", x: 582, y: 562.48 },
          { id: "c4cc8522-ba04-49b2-b9ab-c2ecb46494b8", x: 708, y: 562.48 }
        ],
        text: [
          {
            id: "a2a867e1-db33-4254-8a9a-b59bc65c9660",
            x: 602,
            y: 170.88,
            label: "STAGE",
            fontSize: 35,
            fontWeight: 200,
            letterSpacing: 5,
            color: "#000000"
          }
        ],
        shapes: [
          {
            id: "c2691f89-389c-4cdc-95e0-51b44d8c516d",
            name: "RectangleHorizontal",
            x: 110,
            y: 103.24,
            width: 1100,
            height: 100,
            rx: 10,
            color: "#ffffff00",
            stroke: "#000000"
          }
        ],
        polylines: [],
        images: []
      }}
      events={{
        onSeatClick: (seat) => console.log(seat)
      }}
    />
  )
};
