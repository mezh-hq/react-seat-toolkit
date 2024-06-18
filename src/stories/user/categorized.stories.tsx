import SeatToolkit from "@/index";
import { STKMode } from "../_utils";
import { options } from "../options";

export default {
  title: "User/Categorized",
  component: SeatToolkit,
  ...options
};

export const Story = {
  render: (props) => (
    <SeatToolkit
      mode={STKMode.USER}
      data={{
        name: "Categorized Example",
        categories: [
          { id: "b26fffc7-1e54-43b8-8e29-5077541ee637", name: "Standard", color: "#000000", textColor: "#f7f7f7" },
          { id: "6267c38d-e1ee-433a-9bda-8be0cab0b062", name: "Premium", color: "#ff0000", textColor: "#f7f7f7" },
          { id: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3", name: "VIP", color: "#e5e5ff", textColor: "#000000" }
        ],
        sections: [
          {
            id: "1636dd75-ea0a-48d6-b14c-05ac9db08f5c",
            name: "Section 1",
            color: "#000000",
            stroke: "#000000",
            freeSeating: false
          },
          {
            id: "65dfc91f-f7aa-407a-ae55-b31f1ee3a41c",
            name: "Section 2",
            color: "#FF0000",
            stroke: "#FF0000",
            freeSeating: false
          },
          {
            id: "6975d973-5a37-4490-bf13-85c156cbb6b3",
            name: "Section 3",
            color: "#0000FF",
            stroke: "#0000FF",
            freeSeating: false
          }
        ],
        seats: [
          {
            id: "aa6ba9b6-43ae-4ad9-b6db-8a22c7fc4497",
            x: 610,
            y: 299.03999999999996,
            label: "1",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "1849e944-c944-4e7d-a4e9-718b6198dbd5",
            x: 560,
            y: 299.03999999999996,
            label: "2",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "54de6b9b-6f24-4ba5-995a-f829bdd5b178",
            x: 510,
            y: 299.03999999999996,
            label: "3",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "855fa0ca-d1a1-4ed1-afd8-e8a47ca4d834",
            x: 460,
            y: 299.03999999999996,
            label: "4",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "4709be66-b2cc-443d-9f78-cc12af6af69f",
            x: 410,
            y: 299.03999999999996,
            label: "5",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "a45955c0-328d-458a-8e6d-ba6fa7d7048d",
            x: 360,
            y: 299.03999999999996,
            label: "6",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "14eb5b7e-0176-4429-af0e-e490a73533c4",
            x: 310,
            y: 299.03999999999996,
            label: "7",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "cde57419-d11a-4d00-a3ea-3c0dfc6f069a",
            x: 260,
            y: 299.03999999999996,
            label: "8",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "e2a63232-bd51-44bf-ac0b-cde0965c004c",
            x: 210,
            y: 299.03999999999996,
            label: "9",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "aac76a34-1016-4de8-88e4-7dcefd03924e",
            x: 160,
            y: 299.03999999999996,
            label: "10",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "1dcc9253-e173-434c-931a-13dc08455608",
            x: 710,
            y: 299.03999999999996,
            label: "1",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "6637dccc-53f1-40cd-a984-d609cc1bbe2e",
            x: 760,
            y: 299.03999999999996,
            label: "2",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "ddf4c61c-f7aa-40d5-9d92-c21753925e8a",
            x: 810,
            y: 299.03999999999996,
            label: "3",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "9035d5a3-32e4-4d5d-b939-425d40859c85",
            x: 860,
            y: 299.03999999999996,
            label: "4",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "6c5f204a-4a49-4d78-94fe-e452fee2a85e",
            x: 910,
            y: 299.03999999999996,
            label: "5",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "91ff5c4a-84cc-4b9c-8e77-3352c4c2232b",
            x: 960,
            y: 299.03999999999996,
            label: "6",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "5f2c9d1f-f6c9-41d9-8e4a-c6a1e5658c78",
            x: 1010,
            y: 299.03999999999996,
            label: "7",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "3c3b93f4-dfe5-4299-b819-78f6142c7c1c",
            x: 1060,
            y: 299.03999999999996,
            label: "8",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "9e326964-fa10-4f01-a284-7f9994239e1f",
            x: 1110,
            y: 299.03999999999996,
            label: "9",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "65de8674-b32b-45c5-bfa0-7d625f50cd47",
            x: 1160,
            y: 299.03999999999996,
            label: "10",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "41ad21a6-9672-40d2-a047-d89ffe8e60cf",
            x: 610,
            y: 370.24,
            label: "1",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "00385201-09cd-4b60-87de-070c832fc2da",
            x: 560,
            y: 370.24,
            label: "2",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "e1cb18da-58aa-4ec2-aaba-63620e9d4b4e",
            x: 510,
            y: 370.24,
            label: "3",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "aaa9bb0c-1e86-4d81-8e6e-b73b3fb0e908",
            x: 460,
            y: 370.24,
            label: "4",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "12411d12-1305-4901-90d9-4edcacbcc0dd",
            x: 410,
            y: 370.24,
            label: "5",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "33355bdd-8b1f-4b04-ad6b-cea8c743d654",
            x: 360,
            y: 370.24,
            label: "6",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "46fe3c44-9150-47f9-b77f-d58564762441",
            x: 310,
            y: 370.24,
            label: "7",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "60bf7048-9595-49e3-87de-bbf13b60f815",
            x: 710,
            y: 370.24,
            label: "1",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "5934efd9-7ace-43b5-b394-7479609f5c80",
            x: 760,
            y: 370.24,
            label: "2",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "433041ea-fab5-4763-a8cb-7e8fd3f646a3",
            x: 810,
            y: 370.24,
            label: "3",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "f63ad546-d922-4922-84a2-e5f85878c004",
            x: 860,
            y: 370.24,
            label: "4",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "ab47fe0f-f92a-4371-8816-972fb946aad5",
            x: 910,
            y: 370.24,
            label: "5",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "cc9d43bd-9d3c-4bb9-aeb8-b22d37f21a49",
            x: 960,
            y: 370.24,
            label: "6",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "c3f831c4-e176-49c3-a99b-d429fcbc0e42",
            x: 1010,
            y: 370.24,
            label: "7",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "1867860a-0562-4bb6-9d33-305b9fea5380",
            x: 610,
            y: 441.44,
            label: "1",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "df6c3151-8e25-434c-ae15-06e4f5fa3bc0",
            x: 560,
            y: 441.44,
            label: "2",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "c23a7abd-d483-47b5-b9a0-f29ab7f29e6c",
            x: 510,
            y: 441.44,
            label: "3",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "8e4d585e-498f-4dba-8b2f-12bfdb9fd1da",
            x: 460,
            y: 441.44,
            label: "4",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "562c7a9c-42e3-4446-838f-14c454e3345f",
            x: 410,
            y: 441.44,
            label: "5",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "3058ce38-55d0-4da6-b4f2-b987a62d1fc4",
            x: 710,
            y: 441.44,
            label: "1",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "45176fe5-f6f3-46eb-b3ef-caae21f5c574",
            x: 760,
            y: 441.44,
            label: "2",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "552a1e2d-94d9-4e4d-b5d5-d4c782d1e4f2",
            x: 810,
            y: 441.44,
            label: "3",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "49900593-497c-4c9c-901d-9b23efb48f9d",
            x: 860,
            y: 441.44,
            label: "4",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "551713be-68a7-4e45-9d91-83ebc887961a",
            x: 910,
            y: 441.44,
            label: "5",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "61866c96-b6f9-40a3-a210-8d72c729f13a",
            x: 606.2891235351562,
            y: 29.647051849365198,
            label: "1",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "1ca31d1a-4d11-448e-a214-661df427ce68",
            x: 556.2891235351562,
            y: 29.647051849365198,
            label: "2",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "a2830322-256a-4c6e-b490-8720d5370fd9",
            x: 506.28912353515625,
            y: 29.647051849365198,
            label: "3",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "c6333d01-0af1-43fb-a7d6-35afacfcb848",
            x: 456.28912353515625,
            y: 29.647051849365198,
            label: "4",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "6d029a97-ac78-488c-8eec-59013d202463",
            x: 406.28912353515625,
            y: 29.647051849365198,
            label: "5",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "56512e3b-47e6-4394-9ac7-8dd5dc42b55d",
            x: 356.28912353515625,
            y: 29.647051849365198,
            label: "6",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "3e90f734-d242-471b-ab55-4bc249f53fdc",
            x: 306.28912353515625,
            y: 29.647051849365198,
            label: "7",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "5cfe0b60-01e7-4e98-98f2-8c38541fea7d",
            x: 256.28912353515625,
            y: 29.647051849365198,
            label: "8",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "e8a591df-69ac-4da4-ba1e-586d93bd265b",
            x: 206.28912353515625,
            y: 29.647051849365198,
            label: "9",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "5edd26bb-1439-4596-9a34-68fcb8f553c8",
            x: 156.28912353515625,
            y: 29.647051849365198,
            label: "10",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "3c4ab32f-cd90-4a33-afff-212646b9ee25",
            x: 706.2891235351562,
            y: 29.647051849365198,
            label: "1",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "889a9869-f024-4f40-be6e-eed49ce6f69a",
            x: 756.2891235351562,
            y: 29.647051849365198,
            label: "2",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "d6e770f6-eceb-492d-bb73-7755f189f761",
            x: 806.2891235351562,
            y: 29.647051849365198,
            label: "3",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "762abbe9-925d-4356-a8ca-8a5141809749",
            x: 856.2891235351562,
            y: 29.647051849365198,
            label: "4",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "5d2a2fda-3619-493a-a2a3-4efa08954d93",
            x: 906.2891235351562,
            y: 29.647051849365198,
            label: "5",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "2697116e-e5a8-4aa5-b065-5a9529abeb94",
            x: 956.2891235351562,
            y: 29.647051849365198,
            label: "6",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "ba8adfa0-97f5-4d53-8852-0626094b035b",
            x: 1006.2891235351562,
            y: 29.647051849365198,
            label: "7",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "947776da-e544-4b3c-a010-180f877bd995",
            x: 1056.2891235351562,
            y: 29.647051849365198,
            label: "8",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "79618c30-a434-4197-82b2-b321a4017897",
            x: 1106.2891235351562,
            y: 29.647051849365198,
            label: "9",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "3ef71f7f-0b62-451b-97bf-25bb8f4c149e",
            x: 1156.2891235351562,
            y: 29.647051849365198,
            label: "10",
            status: "Available",
            category: "fe1a1eb0-1f30-4014-ae49-ee8438b720a3"
          },
          {
            id: "7d2902f7-a139-468b-a755-364aec34b977",
            x: 604.8373413085938,
            y: -38.52716232299804,
            label: "1",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "06a75cf2-bde7-4244-82f4-00b9961a00ee",
            x: 554.8373413085938,
            y: -38.52716232299804,
            label: "2",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "99c6c298-acf3-46ff-84b8-271fb871a24d",
            x: 504.83734130859375,
            y: -38.52716232299804,
            label: "3",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "2d4779c5-025e-4629-b613-7cdc44cdcdea",
            x: 454.83734130859375,
            y: -38.52716232299804,
            label: "4",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "79412d59-e3a2-4e77-a5fc-50057e6b650d",
            x: 404.83734130859375,
            y: -38.52716232299804,
            label: "5",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "2bf94007-c9c5-4c2e-95a6-8c64d001ed76",
            x: 354.83734130859375,
            y: -38.52716232299804,
            label: "6",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "d53cb2dd-097a-4ab2-9f44-c9575815d1f2",
            x: 304.83734130859375,
            y: -38.52716232299804,
            label: "7",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "7c3eaa20-44ee-42ad-b2e2-040e28c93867",
            x: 704.8373413085938,
            y: -38.52716232299804,
            label: "1",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "294efccf-259c-4ccd-a61f-aeb7769bdbf1",
            x: 754.8373413085938,
            y: -38.52716232299804,
            label: "2",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "0b42cec5-8be3-4890-98f4-c3447232b853",
            x: 804.8373413085938,
            y: -38.52716232299804,
            label: "3",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "ad18adda-9bd5-4bbc-8ff3-c55c0647df02",
            x: 854.8373413085938,
            y: -38.52716232299804,
            label: "4",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "88f4b014-12b1-4f66-9c7b-add499b68fd4",
            x: 904.8373413085938,
            y: -38.52716232299804,
            label: "5",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "3609da19-240a-4b97-b6eb-5430dcebb4e8",
            x: 954.8373413085938,
            y: -38.52716232299804,
            label: "6",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "f982c4cb-07af-42a0-8dd6-2333aa9fd196",
            x: 1004.8373413085938,
            y: -38.52716232299804,
            label: "7",
            status: "Available",
            category: "6267c38d-e1ee-433a-9bda-8be0cab0b062"
          },
          {
            id: "87800c5e-62c1-4b7c-b668-3900927ebce2",
            x: 606.2891235351562,
            y: -105.24955230712891,
            label: "1",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "0aa9476a-e020-4186-ac3e-58bfec43f334",
            x: 556.2891235351562,
            y: -105.24955230712891,
            label: "2",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "1bfda8f2-aec9-4d65-ab39-adacb1fa41c8",
            x: 506.28912353515625,
            y: -105.24955230712891,
            label: "3",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "85259921-4a0c-4723-9f95-2002b927e53f",
            x: 456.28912353515625,
            y: -105.24955230712891,
            label: "4",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "4d4b159d-8248-406e-9a26-050ae1d0eaeb",
            x: 406.28912353515625,
            y: -105.24955230712891,
            label: "5",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "3e87b6ed-b769-4ddc-b2e2-96b3738ff353",
            x: 706.2891235351562,
            y: -105.24955230712891,
            label: "1",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "4b64c116-a5b7-4728-8cae-d5d3c07716be",
            x: 756.2891235351562,
            y: -105.24955230712891,
            label: "2",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "57dac442-58a2-4a5c-b216-df7622576ea3",
            x: 806.2891235351562,
            y: -105.24955230712891,
            label: "3",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "2d14406f-f0a0-429b-ae9f-000a4a8253dd",
            x: 856.2891235351562,
            y: -105.24955230712891,
            label: "4",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          },
          {
            id: "39232f0b-c2be-4203-9285-a2db975f75e9",
            x: 906.2891235351562,
            y: -105.24955230712891,
            label: "5",
            status: "Available",
            category: "b26fffc7-1e54-43b8-8e29-5077541ee637"
          }
        ],
        booths: [
          { id: "53d042ce-58e7-44ec-9dbd-97f3ced6159d", x: 567.4818725585938, y: 562.48 },
          { id: "14e6a2f4-5a6e-45fe-aa07-e419b5329276", x: 713.259033203125, y: 562.48 },
          { id: "20180e17-1245-4131-a040-46c9b7e0f9b6", x: 562.3191528320312, y: -247.08434631347654 },
          { id: "60dccf2e-818a-4f84-ae6e-b2c8a99adb6f", x: 713.4517822265625, y: -246.08437683105467 }
        ],
        text: [
          {
            id: "116a57ac-9bc2-4f0c-a9fc-e1a57448bda7",
            x: 605.0931396484375,
            y: 167.78687561035156,
            label: "STAGE",
            fontSize: 35,
            fontWeight: 200,
            letterSpacing: 5,
            color: "#ffffff",
            embraceOffset: false
          }
        ],
        shapes: [
          {
            id: "60a1c8d8-efd1-4506-a5a8-59ef16571836",
            name: "RectangleHorizontal",
            x: 110,
            y: 103.24,
            width: 1100,
            height: 100,
            rx: 10,
            color: "#000000",
            stroke: "#000000"
          }
        ],
        polylines: [],
        images: [],
        workspace: { initialViewBoxScale: 0.605909115101895, initialViewBoxScaleForWidth: 1386, visibilityOffset: 0 }
      }}
      {...props}
    />
  )
};
