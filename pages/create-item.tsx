import {
  addFileToIPFS,
  createItem,
  uploadToIPFS,
  IPFSDetails,
} from "../config/config";

import React from "react";
import { useRouter } from "next/router";

import {
  Input,
  Textarea,
  Button,
  Heading,
  Image,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "../styles/styles.module.css";

export default function CreateItem() {
  const [adding, setAdding] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState("");

  const [formInput, setFormInput] = React.useState({
    price: "",
    name: "",
    description: "",
  });

  const formBackground = useColorModeValue("gray.100", "gray.700");

  const router = useRouter();

  const onChange = async (e: any) => {
    setUploading(true);
    setAdding(true);
    const file = e.target.files[0];

    try {
      const url = await addFileToIPFS(file);
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setAdding(false);
    setUploading(false);
  };

  const createNftItem = async () => {
    const { name, description, price } = formInput;

    if (!name || !description || !price) return;

    setAdding(true);

    const ipfsDetails: IPFSDetails = { name, description, fileUrl };

    const url = (await uploadToIPFS(ipfsDetails)) as string;

    await createItem(url, price);

    setAdding(false);

    router.push("/");
  };

  return (
    <Flex height="'100vh'" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Add New Item</Heading>
        <Input
          placeholder="Name"
          mb={3}
          onChange={(e: any) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          placeholder="Price"
          mb={3}
          onChange={(e: any) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />
        <Textarea
          placeholder="Description"
          mb={3}
          onChange={(e: any) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />

        <input type="file" placeholder="Description" onChange={onChange} />
        {fileUrl && (
          <Image
            boxSize="100px"
            objectFit="cover"
            src={fileUrl}
            m={3}
            alt="Name"
          />
        )}

        <Button
          isLoading={adding}
          loadingText={
            uploading ? "Image uploading" : "transaction in progress..."
          }
          onClick={createNftItem}
          color="white"
          bgColor="#0F172A"
          _hover={{ bgColor: "#1E293B" }}
          _active={{ bgColor: "#111827" }}
          mt={5}
        >
          Upload NFT
        </Button>
      </Flex>
    </Flex>
  );
}
