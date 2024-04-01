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
            status: "Unavailable",
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
            status: "Locked",
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

export const WithInitialViewBoxTransform = {
  render: () => (
    <SeatToolkit
      mode={"user"}
      data={{
        name: "Type your location here",
        categories: [
          { id: "6cf3629a-a0a9-4fb5-8567-04cfb4b36cd1", name: "Standard", color: "#000000", textColor: "#f7f7f7" },
          { id: "4faabe77-45b2-4450-b35e-e02934ee3fdb", name: "Premium", color: "#FF0000", textColor: "#f7f7f7" },
          { id: "c1d2e702-6a57-49a1-89b6-17c9fcbec405", name: "VIP", color: "#0000FF", textColor: "#f7f7f7" }
        ],
        sections: [
          {
            id: "74810ecc-42ce-417b-b77e-36716aaea9c4",
            name: "Section 1",
            color: "#000000",
            stroke: "#000000",
            freeSeating: true
          },
          {
            id: "7d031adf-7981-44ce-ac6d-500a5bec7a64",
            name: "Section 2",
            color: "#FF0000",
            stroke: "#FF0000",
            freeSeating: false
          },
          {
            id: "b89a6701-5e4b-4be0-96a2-41a1c8d68abf",
            name: "Section 3",
            color: "#0000FF",
            stroke: "#0000FF",
            freeSeating: false
          }
        ],
        seats: [
          {
            id: "6e2f2a99-b719-4368-b19d-b74efa9eafb1",
            x: 610,
            y: 299.03999999999996,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "86dc4d67-f66a-4bc1-9aeb-d8951f185be9",
            x: 560,
            y: 299.03999999999996,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "d06de13d-711e-4d6f-b49e-4aaf4b3b74b3",
            x: 510,
            y: 299.03999999999996,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "a20d9ab2-4326-497b-b840-8e2875aeecad",
            x: 460,
            y: 299.03999999999996,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "331b9479-a8ba-4592-8b6e-5421afa248ff",
            x: 410,
            y: 299.03999999999996,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "65002aba-04ce-4e15-93ea-7cd62558844c",
            x: 360,
            y: 299.03999999999996,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "92f60db9-1524-4505-a342-b88abd57b931",
            x: 310,
            y: 299.03999999999996,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "9edf6f6e-60fb-4d02-9852-0bc631338e05",
            x: 260,
            y: 299.03999999999996,
            label: "8",
            status: "Available",
            category: null
          },
          {
            id: "3c93473e-ebea-479f-bea6-21287de10873",
            x: 210,
            y: 299.03999999999996,
            label: "9",
            status: "Available",
            category: null
          },
          {
            id: "cf48a638-f228-459d-bddf-be94a039dbdf",
            x: 160,
            y: 299.03999999999996,
            label: "10",
            status: "Available",
            category: null
          },
          {
            id: "b12535e3-d895-4757-b756-9b8ff6c43488",
            x: 710,
            y: 299.03999999999996,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "ca873ff6-9c61-4843-85f3-6e93a220453b",
            x: 760,
            y: 299.03999999999996,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "7e333a51-5d4a-4ce3-9905-8538687b8868",
            x: 810,
            y: 299.03999999999996,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "3a63306d-89fd-4b2c-bc57-1f13febbc033",
            x: 860,
            y: 299.03999999999996,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "e632ad90-471f-41f5-9d5a-3883fe45d46d",
            x: 910,
            y: 299.03999999999996,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "9a0f6a22-8e71-4049-8d02-385385c5748a",
            x: 960,
            y: 299.03999999999996,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "b58fe1e1-c5e8-4eee-88f6-4abe9f08a67d",
            x: 1010,
            y: 299.03999999999996,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "384b753b-e553-4094-a2bd-c3f494c7fcf1",
            x: 1060,
            y: 299.03999999999996,
            label: "8",
            status: "Available",
            category: null
          },
          {
            id: "6f372f69-d9d2-4a73-93e1-43ba62a1a156",
            x: 1110,
            y: 299.03999999999996,
            label: "9",
            status: "Available",
            category: null
          },
          {
            id: "3a5173a9-ca4e-461e-9ea4-6d08b05551a2",
            x: 1160,
            y: 299.03999999999996,
            label: "10",
            status: "Available",
            category: null
          },
          {
            id: "d8f5879f-176b-4e21-82a0-4f1e0ca15a1b",
            x: 610,
            y: 370.24,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "5da96ce2-a593-40ab-9b9f-3d8612572d18",
            x: 560,
            y: 370.24,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "f7eeb654-1b86-40f0-8b46-032405f642c3",
            x: 510,
            y: 370.24,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "deb12709-35cf-439a-9209-e2a5bc61c6e3",
            x: 460,
            y: 370.24,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "06ee6d6b-4fbe-4213-b088-b0f5838cee5c",
            x: 410,
            y: 370.24,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "bf04f0ef-7d6a-4abd-8b45-365ec1f3c7e9",
            x: 360,
            y: 370.24,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "75371079-6745-489f-aa58-23391d3046bb",
            x: 310,
            y: 370.24,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "3a31b0f8-e5ac-4fcb-984e-6091744b0379",
            x: 710,
            y: 370.24,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "4792a1fa-5441-4eee-869b-729dec2517bd",
            x: 760,
            y: 370.24,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "073b1e2c-9f45-4924-a281-1fcfe64ec2c4",
            x: 810,
            y: 370.24,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "25f22918-f115-419f-a7a9-4b2274e26d7d",
            x: 860,
            y: 370.24,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "e879ea01-0653-411f-b3a6-885fcfde42fc",
            x: 910,
            y: 370.24,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "cad003e5-7657-475f-b1a5-fdd5a753ff0f",
            x: 960,
            y: 370.24,
            label: "6",
            status: "Available",
            category: null
          },
          {
            id: "51b6472c-1ff9-4a56-863d-a95643cebd58",
            x: 1010,
            y: 370.24,
            label: "7",
            status: "Available",
            category: null
          },
          {
            id: "b5b3e17f-5d4e-48ad-a4f1-98a3fea91556",
            x: 610,
            y: 441.44,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "ccb05b4e-568d-44d0-8fa4-331536a94dc8",
            x: 560,
            y: 441.44,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "5a837697-93ca-40af-9f64-2c094c167d16",
            x: 510,
            y: 441.44,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "e2789eba-9379-4f04-80f9-40dea86a7742",
            x: 460,
            y: 441.44,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "b5ba13a6-d4ac-4422-9297-b21cc3725f7f",
            x: 410,
            y: 441.44,
            label: "5",
            status: "Available",
            category: null
          },
          {
            id: "f1166991-86fd-4c71-a015-26650ab45fa6",
            x: 710,
            y: 441.44,
            label: "1",
            status: "Available",
            category: null
          },
          {
            id: "17811c8b-7f97-4469-9355-407de836a547",
            x: 760,
            y: 441.44,
            label: "2",
            status: "Available",
            category: null
          },
          {
            id: "13899164-0541-413f-b6d3-d38b46f98fcc",
            x: 810,
            y: 441.44,
            label: "3",
            status: "Available",
            category: null
          },
          {
            id: "c13f10dd-5bfe-4e31-a667-5f8a8a19d1e9",
            x: 860,
            y: 441.44,
            label: "4",
            status: "Available",
            category: null
          },
          {
            id: "8c379eb9-45a6-4fc7-9de2-a93e67b4bf96",
            x: 910,
            y: 441.44,
            label: "5",
            status: "Available",
            category: null
          }
        ],
        booths: [
          { id: "92d30d1f-aa2a-4de0-a2ff-4b0a6433bdbf", x: 582, y: 562.48 },
          { id: "3a825886-1737-49cb-b1f0-3bebd54acaa0", x: 708, y: 562.48 }
        ],
        text: [
          {
            id: "9758de86-ca95-44d7-845e-7891408a77d5",
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
            id: "2f62a2a5-4bd9-4f59-9e96-39e49b85d554",
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
        images: [],
        workspace: { initialViewBoxScale: 0.63822814939213, visibilityOffset: 0 }
      }}
    />
  )
};
