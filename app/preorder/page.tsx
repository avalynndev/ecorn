"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Heading, Container, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import SignOut from "@/components/sign-out";
import { sendContactForm } from "../../lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  isLoading: boolean;
  error: string;
  values: FormValues;
}
const initValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const initState: FormState = {
  isLoading: false,
  error: "",
  values: initValues,
};

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState<FormState>(initState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }: any) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <a href="/">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="text-xl font-semibold">Pre-Order</h3>
            <p className="text-sm text-gray-500">
              Use your flat no. to get your required orders to your doorstep
            </p>
            <CacheProvider>
              <ChakraProvider theme={extendTheme({ initialColorMode: "dark" })}>
                <Container
                  textAlign="center"
                  fontSize="2xl"
                  p="1em"
                  maxW="450px"
                  mt={12}
                >
                  {error && (
                    <Text color="red.300" my={4} fontSize="xl">
                      {error}
                    </Text>
                  )}
                  <FormControl
                    isRequired
                    isInvalid={touched.name && !values.name}
                    mb={5}
                  >
                    <FormLabel>Flat no.</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      errorBorderColor="red.300"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={onBlur}
                    />
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={touched.email && !values.email}
                    mb={5}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      errorBorderColor="red.300"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={onBlur}
                    />
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={touched.message && !values.message}
                    mb={5}
                  >
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      typeof="text"
                      name="message"
                      rows={4}
                      errorBorderColor="red.300"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={onBlur}
                    />
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>

                  <Button
                    variant="outline"
                    colorScheme="blue"
                    isLoading={isLoading}
                    disabled={!values.name || !values.email || !values.message}
                    onClick={onSubmit}
                  >
                    Submit
                  </Button>
                  <br />
                </Container>
              </ChakraProvider>
            </CacheProvider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
