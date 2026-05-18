import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="ptb-120">
        <div className="container">
          <div className="text-center">
            <div className="mb-4">
              <Image
                src="/images/oops-404-error.png"
                alt="404"
                width={500}
                height={447}
              />
            </div>

            <h2 className="mb-2">404 - Page Not Found!</h2>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>

            <Link href="/" className="btn d-inline-block mt-3">
              Go Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
