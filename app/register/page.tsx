import Form from "@/components/form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <a href="">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="text-xl font-semibold">Sign Up</h3>
            <p className="text-sm text-gray-500">
              Create an account with your email and password
            </p>
          </div>
          <Form type="register" />
        </div>
      </div>
      <Footer />
    </>
  );
}
