/**
 * This is the main entry point for the RFP application.
 * Page route gets passed in through params, along with all other page props.
 */

const { page, ...passProps } = props;

// Import our modules
const { AppLayout } = VM.require(
  `${REPL_AI_PGF_FORUM}/widget/components.template.AppLayout`
);

if (!AppLayout) {
  return <p>Loading modules...</p>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 72px 64px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  background-color: #e9ecef;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }
`;

const ProfileImgOverlay = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: #7b7b7b;
    width: 20px;
    height: 20px;
  }
`;

const AddMember = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const FormSection = styled.div`
  margin-bottom: 40px;

  label {
    font-weight: 500;
    color: #333;
  }

  textarea,
  input,
  select {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const Sidebar = styled.div`
  padding: 20px;
  border-radius: 8px;
`;

const SidebarTitle = styled.h5`
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
`;

const ConsentSection = styled.div`
  margin-top: 30px;

  .form-check-label {
    font-size: 14px;
  }
`;

const ButtonPrimary = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  background-color: #007bff;
  border: none;
  color: white;
`;

const ButtonSecondary = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  color: #007bff;
  border: 1px solid #007bff;
  background-color: white;
`;

const DescriptionField = styled.textarea`
  min-height: 250px;
`;

State.init({
  projectName: "",
  category: "AI-PGF",
  publicGoodReason: "",
  description: "",
  author: context.accountId,
  walletAddress: "",
  repo1: "",
  repo2: "",
  website: "",
  twitter: "",
  telegram: "",
  github: "",
  termsConditions: false,
  codeConduct: false,
});

const handleInputChange = (field, value) => {
  State.update({ [field]: value });
};

const handleSubmit = () => {
  if (!state.termsConditions || !state.codeConduct) {
    alert("Please agree to the terms and conditions and code of conduct.");
    return;
  }

  const body = {
    proposal_body_version: "V1",
    linked_rfp: linkedRfp?.value,
    category: "AI PGF",
    name: state.projectName,
    description: description,
    summary: state.publicGoodReason,
    linked_proposals: [],
    requested_sponsorship_usd_amount: "0",
    requested_sponsorship_paid_in_currency: "USDC",
    receiver_account: state.walletAddress,
    requested_sponsor: "impact.sputnik-dao.near",
    timeline: { status: "DRAFT" },
  };
  const args = {
    labels: [],
    body: body,
  };

  Near.call([
    {
      contractName: "${REPL_AI_PGF_FORUM_CONTRACT}",
      methodName: "add_proposal",
      args: args,
      gas: 270000000000000,
      deposit: "100000000000000000000000",
    },
  ]);
};

// CSS styles to be used across the app.
// Define fonts here, as well as any other global styles.
const Theme = styled.div`
  a {
    color: inherit;
  }

  background-color: white;

  .attractable {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    transition: box-shadow 0.6s;

    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
  }
`;

if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "proposals";
}

// This is our navigation, rendering the page based on the page parameter
function Page() {
  let registrants = Near.view(
    `lists.potlock.near`,
    "get_registrations_for_list",
    {
      list_id: 1,
    }
  );
  const potlockRegistrants =
    registrants && registrants.map((item) => item.registrant_id);

  const routes = page.split(".");
  switch (routes[0]) {
    case "rfps": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.rfps.Feed`}
          props={passProps}
        />
      );
    }
    case "rfp": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.rfps.Rfp`}
          props={passProps}
        />
      );
    }
    case "create-rfp": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.rfps.Editor`}
          props={passProps}
        />
      );
    }
    case "create-proposal": {
      return (
        <>
          {context.accountId &&
          !potlockRegistrants?.includes(context?.accountId) ? (
            <Widget
              src={`${REPL_POTLOCK}/widget/Project.CreateForm`}
              props={{ ...passProps }}
            />
          ) : (
            <Widget
              src={`${REPL_AI_PGF_FORUM}/widget/components.proposals.Editor`}
              props={{ ...passProps }}
            />
          )}
        </>
      );
    }
    case "ideas": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.proposals.Feed`}
          props={passProps}
        />
      );
    }

    case "proposals": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.proposals.Feed`}
          props={passProps}
        />
      );
    }
    case "proposal": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.proposals.Proposal`}
          props={passProps}
        />
      );
    }
    case "admin": {
      return (
        <Widget
          src={`${REPL_AI_PGF_FORUM}/widget/components.pages.admin`}
          props={passProps}
        />
      );
    }
    default: {
      // TODO: 404 page
      return <p>404</p>;
    }
  }
}

return (
  <Theme>
    <AppLayout page={page}>
      <Page />
    </AppLayout>
  </Theme>
);
