import siteConfig from "@/config/site";
import Typography from "@/components/ui/typography";

const TermsPage = () => {
  return (
    <section className="container h-[91vh] overflow-hidden overflow-y-scroll">
      <div className="flex flex-col gap-4 border-x-2 border-x-zinc-800 px-5 py-4">
        <Typography type="heading" className="text-2xl font-bold">
          Terms and Conditions
        </Typography>
        <Typography type="paragraph">Last updated: 13th July 2023</Typography>
        <div>
          <Typography type="paragraph">
            Please read these Terms and Conditions (&#34;Terms&#34;) carefully
            before using the [{siteConfig.name}] web application (the
            &#34;Application&#34;) operated by [Your Company Name]
            (&#34;we,&#34; &#34;us,&#34; or &#34;our&#34;). By accessing or
            using the Application, you agree to be bound by these Terms. If you
            disagree with any part of these Terms, you should not access or use
            the Application.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Use of the Application
          </Typography>
          <Typography type="paragraph">
            The Application is provided for informational and educational
            purposes only. By using the Application, you agree to use it in
            accordance with these Terms and all applicable laws and regulations.
            You agree not to use the Application for any unlawful or prohibited
            purposes.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Intellectual Property
          </Typography>
          <Typography type="paragraph">
            The content and materials available on the Application, including
            but not limited to text, graphics, logos, images, videos, and
            software, are owned by or licensed to us and are protected by
            intellectual property laws. You may not use, modify, reproduce,
            distribute, or display any of the content or materials from the
            Application without our prior written consent.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            User Contributions
          </Typography>
          <Typography type="paragraph">
            The Application may allow users to contribute content, such as
            posts, comments, and messages. By submitting user contributions, you
            grant us a non-exclusive, worldwide, royalty-free, perpetual,
            irrevocable, and fully sublicensable right to use, reproduce,
            modify, adapt, publish, translate, create derivative works from,
            distribute, and display such contributions in any media. You
            represent and warrant that you own or have the necessary rights to
            grant the above license and that your user contributions do not
            infringe or violate the rights of any third party. We have the
            right, but not the obligation, to monitor, edit, or remove user
            contributions at our sole discretion. We are not responsible for any
            user contributions posted by users of the Application.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Privacy
          </Typography>
          <Typography type="paragraph">
            Your use of the Application is subject to our Privacy Policy, which
            describes how we collect, use, and disclose your personal
            information. By using the Application, you consent to our
            collection, use, and disclosure of your personal information as
            described in the Privacy Policy.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Links to Third-Party Websites
          </Typography>
          <Typography type="paragraph">
            The Application may contain links to third-party websites or
            services that are not owned or controlled by us. We have no control
            over and assume no responsibility for the content, privacy policies,
            or practices of any third-party websites or services. We encourage
            you to review the terms and conditions and privacy policies of any
            third-party websites or services that you access through the
            Application.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Limitation of Liability
          </Typography>
          <Typography type="paragraph">
            To the fullest extent permitted by applicable law, we shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to damages for loss of
            profits, goodwill, use, data, or other intangible losses, arising
            out of or in connection with your use or inability to use the
            Application.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Indemnification
          </Typography>
          <Typography type="paragraph">
            You agree to indemnify, defend, and hold us harmless from and
            against any claims, liabilities, damages, losses, costs, or
            expenses, including reasonable attorneys&#34; fees, arising out of
            or in connection with your use of the Application or any violation
            of these Terms.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Changes to these Terms
          </Typography>
          <Typography type="paragraph">
            We may update these Terms from time to time. We will notify you of
            any changes by posting the updated Terms on the Application. You are
            advised to review these Terms periodically for any changes. Changes
            to these Terms are effective when they are posted on this page.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Governing Law
          </Typography>
          <Typography type="paragraph">
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Country], without regard to its conflict of law
            provisions.
          </Typography>
        </div>
        <div>
          <Typography type="subheading" className="font-bold">
            Contact Us
          </Typography>
          <Typography type="paragraph">
            If you have any questions or concerns about these Terms, please
            contact us at
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

export default TermsPage;
