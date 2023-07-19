import siteConfig from "@/config/site";
import Typography from "@/components/ui/Typography";

const PrivacyPolicyPage = () => {
  return (
    <section className="container h-[91vh] overflow-hidden overflow-y-scroll">
      <div className="flex flex-col gap-4 border-x-2 border-x-zinc-800 px-5 py-4">
        <Typography type="heading" className="text-2xl font-bold">
          Privacy Policy
        </Typography>
        <Typography type="paragraph">Last updated: 13th July 2023</Typography>
        <div>
          <Typography type="paragraph">
            This Privacy Policy describes how {siteConfig.name}
            (&#34;we,&#34; &#34;us,&#34; or &#34;our&#34;) collects, uses, and
            shares your personal information when you use our web application [
            {siteConfig.name}] (the &#34;Application&#34;). Please read this
            Privacy Policy carefully. By accessing or using the Application, you
            agree to the collection, use, and sharing of your information as
            described in this Privacy Policy. If you do not agree with the
            practices described in this Privacy Policy, you should not use the
            Application.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Information We Collect
          </Typography>
          <Typography type="paragraph">
            We may collect certain personal information from you when you use
            the Application. The types of information we may collect include:
          </Typography>
          <p>
            <span className="text-base font-semibold">
              Contact Information:{" "}
            </span>
            When you contact us through the email provided by the developer (
            <Typography email="contact@bharathbandi.me" type="email">
              contact@bharathbandi.me
            </Typography>
            ), we may collect your email address or any other contact
            information you provide.
          </p>
          <p>
            <span className="text-base font-semibold">Usage Information: </span>
            We may collect information about your use of the Application, such
            as the actions you take while using the Application, the communities
            you join or create, and the posts you publish.
          </p>
          <p>
            <span className="text-base font-semibold">
              Device Information:{" "}
            </span>
            We may collect information about the device you use to access the
            Application, including the device type, operating system, browser
            type, and IP address.
          </p>
          <p>
            <span className="text-base font-semibold">Cookies:</span> We may use
            cookies and similar technologies to collect information about your
            use of the Application. Cookies are small files stored on your
            device that allow us to recognize your device and enhance your user
            experience. You have the option to disable cookies in your browser
            settings, but please note that some features of the Application may
            not function properly if cookies are disabled.
          </p>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            How We Use Your Information
          </Typography>
          <Typography type="paragraph">
            We may use the personal information we collect for the following
            purposes: To provide and maintain the Application, including
            creating and managing user accounts, communities, and posts. To
            improve the user experience of the Application, by analyzing usage
            patterns and optimizing the Application&quot;s performance. To
            communicate with you, respond to your inquiries, and provide
            customer support. To send you updates, newsletters, and other
            promotional materials, but only if you have opted-in to receive such
            communications. To enforce our terms of service and protect the
            rights, property, or safety of our users or others.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            How We Share Your Information
          </Typography>
          <Typography type="paragraph">
            We may share your personal information in the following
            circumstances:
            <p className="inline-block">
              <span className="text-base font-semibold">
                Service Providers:{" "}
              </span>
              We may share your information with third-party service providers
              that help us operate and improve the Application, such as hosting
              providers, analytics providers, and email service providers. These
              service providers are bound by confidentiality obligations and are
              not permitted to use your information for any purpose other than
              to provide services to us.
            </p>
            <p>
              <span className="text-base font-semibold">
                Legal Compliance:{" "}
              </span>
              We may disclose your information if required by law or if we
              believe that such action is necessary to comply with a legal
              obligation or protect our rights or the rights of others.
            </p>
            <p>
              <span className="text-base font-semibold">
                Business Transfers:{" "}
              </span>
              In the event of a merger, acquisition, or sale of all or a portion
              of our assets, your information may be transferred as part of the
              transaction. We will notify you via email or a prominent notice on
              the Application of any change in ownership or uses of your
              personal information.
            </p>
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Data Security
          </Typography>
          <Typography type="paragraph">
            We take reasonable measures to protect the security of your personal
            information. However, please note that no method of transmission or
            storage is completely secure. While we strive to use commercially
            acceptable means to protect your personal information, we cannot
            guarantee its absolute security.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Your Rights
          </Typography>
          <Typography type="paragraph">
            You have certain rights regarding your personal information, subject
            to applicable law. These rights may include:
            <p>
              <span className="text-base font-semibold">Access: </span>You can
              request access to the personal information we hold about you.
            </p>
            <p>
              <span className="text-base font-semibold">Correction:</span>You
              can request that we correct or update your personal information if
              it is inaccurate or incomplete. Deletion: You can request the
              deletion of your personal information.
            </p>
            <p>
              <span className="text-base font-semibold">
                Objecting to Processing:
              </span>{" "}
              You can object to the processing of your personal information for
              certain purposes. Please note that we may ask you to verify your
              identity before responding to such requests. To exercise your
              rights, please contact us using the contact information provided
              at the end of this Privacy Policy.
            </p>
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Third-Party Links and Services
          </Typography>
          <Typography type="paragraph">
            The Application may contain links to third-party websites, products,
            or services that are not owned or controlled by us. We are not
            responsible for the privacy practices of these third parties. We
            encourage you to review the privacy policies of any third-party
            websites, products, or services that you access through the
            Application.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Children&quot;s Privacy
          </Typography>
          <Typography type="paragraph">
            The Application is not intended for use by individuals under the age
            of 16. We do not knowingly collect personal information from
            children under 16. If we become aware that we have collected
            personal information from a child under 16 without verification of
            parental consent, we will take steps to remove that information. If
            you believe that we may have collected personal information from a
            child under 16, please contact us using the contact information
            provided below.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Changes to this Privacy Policy
          </Typography>
          <Typography type="paragraph">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the updated Privacy Policy on the
            Application. You are advised to review this Privacy Policy
            periodically for any changes. Changes to this Privacy Policy are
            effective when they are posted on this page.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Contact Us
          </Typography>
          <Typography type="paragraph">
            If you have any questions or concerns about this Privacy Policy or
            our privacy practices, please contact us at{" "}
            <Typography email="contact@bharathbandi.me" type="email">
              contact@bharathbandi.me
            </Typography>
            .
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
