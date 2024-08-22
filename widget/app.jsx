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

  textarea, input, select {
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
  projectID: '',
  projectName: '',
  category: '',
  publicGoodReason: '',
  description: '',
  author: 'Adrian Robison',
  walletAddress: '',
  repo1: '',
  repo2: '',
  website: '',
  twitter: '',
  telegram: '',
  github: '',
  termsConditions: false,
  codeConduct: false,
});

const handleInputChange = (field, value) => {
  State.update({ [field]: value });
};

const handleSubmit = () => {
  if (!state.termsConditions || !state.codeConduct) {
    alert('Please agree to the terms and conditions and code of conduct.');
    return;
  }
  // Submit logic here
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
  let labels = Near.view(`lists.potlock.near`, "get_registrations_for_list", {
    list_id: 1,
  });
  const allIds = labels.map((item) => item.registrant_id);

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
          {!allIds?.includes(context?.accountId) ? (
            <>
             <Container>
    <div className="row">
      <div className="col-md-8">
        <div className="text-center">
          <ProfileImg>
            <img src="https://via.placeholder.com/120" alt="Profile Image" />
            <ProfileImgOverlay htmlFor="profile-image-upload">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.5 6.5H18.33L16.5 4.5H10.5V6.5H15.62L17.45 8.5H21.5V20.5H5.5V11.5H3.5V20.5C3.5 21.6 4.4 22.5 5.5 22.5H21.5C22.6 22.5 23.5 21.6 23.5 20.5V8.5C23.5 7.4 22.6 6.5 21.5 6.5ZM8.5 14.5C8.5 17.26 10.74 19.5 13.5 19.5C16.26 19.5 18.5 17.26 18.5 14.5C18.5 11.74 16.26 9.5 13.5 9.5C10.74 9.5 8.5 11.74 8.5 14.5ZM13.5 11.5C15.15 11.5 16.5 12.85 16.5 14.5C16.5 16.15 15.15 17.5 13.5 17.5C11.85 17.5 10.5 16.15 10.5 14.5C10.5 12.85 11.85 11.5 13.5 11.5ZM5.5 6.5H8.5V4.5H5.5V1.5H3.5V4.5H0.5V6.5H3.5V9.5H5.5V6.5Z"></path></svg>
            </ProfileImgOverlay>
            <input type="file" id="profile-image-upload" />
          </ProfileImg>
          <AddMember>Add member</AddMember>
        </div>

        <FormSection>
          <label htmlFor="projectID">Project ID</label>
          <input type="text" className="form-control" id="projectID" placeholder="Enter Title Here" 
            value={state.projectID} 
            onChange={(e) => handleInputChange('projectID', e.target.value)} 
          />
        </FormSection>

        <FormSection>
          <label htmlFor="projectName">Project Name</label>
          <input type="text" className="form-control" id="projectName" placeholder="Enter Title Here" 
            value={state.projectName} 
            onChange={(e) => handleInputChange('projectName', e.target.value)} 
          />
        </FormSection>

        <FormSection>
          <label htmlFor="category">Category</label>
          <select className="form-select" id="category" 
            value={state.category} 
            onChange={(e) => handleInputChange('category', e.target.value)}>
            <option value="" disabled>Choose Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
        </FormSection>

        <FormSection>
          <label htmlFor="publicGood">Why Do you consider yourself a public good?</label>
          <textarea className="form-control" id="publicGood" rows="3" placeholder="Enter response here." 
            value={state.publicGoodReason} 
            onChange={(e) => handleInputChange('publicGoodReason', e.target.value)} 
          />
        </FormSection>

        <FormSection>
          <label htmlFor="description">Description</label>
          <DescriptionField className="form-control" id="description" rows="8"
            placeholder="**PROJECT DETAILS**
            Provide a clear overview of the scope, deliverables, and expected outcomes. What benefits will it provide to the community? How will you measure success?

            **TIMELINE**
            Describe the timeline of your project and key milestones, specifying if the work was already complete or not. Include your plans for reporting progress to the community.

            -- OPTIONAL FIELDS // Please remove this line--

            **TEAM**
            Provide all of those who will be working on the project along with their relevant skillset and experience.

            **BUDGET BREAKDOWN**
            Include a detailed breakdown on how you will use the funds and include rate justification."
            value={state.description} 
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </FormSection>
      </div>

      <div className="col-md-4">
        <Sidebar>
          <SidebarTitle>Author Details</SidebarTitle>
          <FormSection>
            <label htmlFor="author">Author</label>
            <input type="text" className="form-control" id="author" value={state.author} readonly />
          </FormSection>

          <SidebarTitle>Smart Contract Address</SidebarTitle>
          <FormSection>
            <label htmlFor="walletAddress">Wallet Address</label>
            <input type="text" className="form-control" id="walletAddress" placeholder="Enter Address" 
              value={state.walletAddress} 
              onChange={(e) => handleInputChange('walletAddress', e.target.value)} 
            />
          </FormSection>

          <SidebarTitle>Open source repositories</SidebarTitle>
          <FormSection>
            <input type="text" className="form-control mb-2" placeholder="https://github.com/repo1"
              value={state.repo1} 
              onChange={(e) => handleInputChange('repo1', e.target.value)} 
            />
            <input type="text" className="form-control" placeholder="https://github.com/repo2"
              value={state.repo2} 
              onChange={(e) => handleInputChange('repo2', e.target.value)} 
            />
          </FormSection>

          <SidebarTitle>Social Links</SidebarTitle>
          <FormSection>
            <label htmlFor="website">Website</label>
            <input type="url" className="form-control mb-2" id="website" placeholder="http://"
              value={state.website} 
              onChange={(e) => handleInputChange('website', e.target.value)} 
            />
            <label htmlFor="twitter">Twitter</label>
            <input type="text" className="form-control mb-2" id="twitter" placeholder="Twitter Handle"
              value={state.twitter} 
              onChange={(e) => handleInputChange('twitter', e.target.value)} 
            />
            <label htmlFor="telegram">Telegram</label>
            <input type="text" className="form-control mb-2" id="telegram" placeholder="Telegram Handle"
              value={state.telegram} 
              onChange={(e) => handleInputChange('telegram', e.target.value)} 
            />
            <label htmlFor="github">GitHub</label>
            <input type="text" className="form-control" id="github" placeholder="GitHub Username"
              value={state.github} 
              onChange={(e) => handleInputChange('github', e.target.value)} 
            />
          </FormSection>
        </Sidebar>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col-md-8">
        <FormSection>
          <label htmlFor="finalProjectName">Project Name</label>
          <input type="text" className="form-control" id="finalProjectName" placeholder="Enter Title Here"
            value={state.projectName} 
            onChange={(e) => handleInputChange('projectName', e.target.value)} 
          />
        </FormSection>
        <ConsentSection>
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="termsConditions"
              checked={state.termsConditions} 
              onChange={() => handleInputChange('termsConditions', !state.termsConditions)} 
            />
            <label className="form-check-label" htmlFor="termsConditions">
              I've agreed to AIPGP's Terms and Conditions and commit to honoring it
            </label>
          </div>
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="codeConduct"
              checked={state.codeConduct} 
              onChange={() => handleInputChange('codeConduct', !state.codeConduct)} 
            />
            <label className="form-check-label" htmlFor="codeConduct">
              I've read DevHub's Code of Conduct and commit to honoring it
            </label>
          </div>
        </ConsentSection>
        <div className="d-flex justify-content-between">
          <ButtonSecondary>Discard Changes</ButtonSecondary>
          <ButtonPrimary onClick={handleSubmit}>Create Project</ButtonPrimary>
        </div>
      </div>
    </div>
  </Container>
            </>
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

// <img
// src="data:image/jpeg;base64,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"
// className="rounded-circle"
// style={{ width: 100, height: 100 }}
// alt="Profile"
// />

{
  /* <g clipPath="url(#clip0_78_2499)">
                                <path
                                  d="M8.80172 13.5348C9.5084 12.9408 10.0153 12.1439 10.2537 11.252C10.492 10.3601 10.4503 9.41656 10.1342 8.5492C9.81811 7.68185 9.24289 6.9327 8.48657 6.40336C7.73024 5.87401 6.82942 5.59009 5.90625 5.59009C4.98309 5.59009 4.08226 5.87401 3.32594 6.40336C2.56962 6.9327 1.9944 7.68185 1.67829 8.5492C1.36218 9.41656 1.32048 10.3601 1.55885 11.252C1.79721 12.1439 2.3041 12.9408 3.01078 13.5348C1.90729 14.0338 0.950991 14.8087 0.234144 15.7848C0.101742 15.9653 0.0464357 16.1909 0.0803901 16.4121C0.114344 16.6333 0.234779 16.8319 0.415198 16.9643C0.595618 17.0967 0.821244 17.152 1.04244 17.1181C1.26364 17.0841 1.46229 16.9637 1.59469 16.7833C2.09091 16.1055 2.73991 15.5544 3.48903 15.1744C4.23815 14.7944 5.06629 14.5964 5.90625 14.5964C6.74622 14.5964 7.57436 14.7944 8.32347 15.1744C9.07259 15.5544 9.72159 16.1055 10.2178 16.7833C10.3502 16.9638 10.5489 17.0843 10.7702 17.1183C10.9914 17.1523 11.2171 17.0971 11.3977 16.9647C11.5782 16.8323 11.6987 16.6336 11.7327 16.4123C11.7667 16.1911 11.7115 15.9653 11.5791 15.7848C10.8618 14.8088 9.90531 14.034 8.80172 13.5348ZM3.09375 10.0937C3.09375 9.53748 3.2587 8.99371 3.56774 8.5312C3.87679 8.06868 4.31604 7.7082 4.82996 7.49533C5.34387 7.28246 5.90937 7.22676 6.45494 7.33528C7.00052 7.4438 7.50166 7.71167 7.89499 8.105C8.28833 8.49834 8.55619 8.99948 8.66471 9.54505C8.77323 10.0906 8.71754 10.6561 8.50466 11.17C8.29179 11.684 7.93131 12.1232 7.46879 12.4322C7.00628 12.7413 6.46251 12.9062 5.90625 12.9062C5.16033 12.9062 4.44496 12.6099 3.91752 12.0825C3.39007 11.555 3.09375 10.8397 3.09375 10.0937ZM17.5852 16.9612C17.4958 17.0268 17.3945 17.0742 17.2868 17.1006C17.1792 17.1271 17.0674 17.132 16.9578 17.1153C16.8482 17.0985 16.743 17.0603 16.6482 17.0028C16.5534 16.9454 16.4709 16.8698 16.4053 16.7805C15.9079 16.104 15.2586 15.5538 14.5098 15.174C13.7609 14.7942 12.9334 14.5955 12.0938 14.5937C11.87 14.5937 11.6554 14.5048 11.4971 14.3466C11.3389 14.1884 11.25 13.9738 11.25 13.75C11.25 13.5262 11.3389 13.3116 11.4971 13.1534C11.6554 12.9951 11.87 12.9062 12.0938 12.9062C12.5079 12.9058 12.9168 12.8138 13.2912 12.637C13.6657 12.4602 13.9965 12.2029 14.26 11.8834C14.5236 11.564 14.7133 11.1903 14.8157 10.789C14.918 10.3878 14.9305 9.96886 14.8523 9.56221C14.774 9.15556 14.6069 8.77121 14.3629 8.43661C14.1189 8.10201 13.804 7.82542 13.4408 7.6266C13.0775 7.42778 12.6748 7.31163 12.2615 7.28644C11.8481 7.26126 11.4343 7.32767 11.0496 7.48093C10.9466 7.52312 10.8362 7.5445 10.7248 7.54383C10.6135 7.54316 10.5033 7.52045 10.4008 7.47702C10.2983 7.43359 10.2053 7.37028 10.1274 7.29076C10.0494 7.21124 9.98798 7.11708 9.94659 7.0137C9.9052 6.91032 9.88469 6.79977 9.88623 6.68842C9.88777 6.57707 9.91133 6.46713 9.95557 6.36494C9.9998 6.26274 10.0638 6.17031 10.144 6.09298C10.2241 6.01565 10.3187 5.95494 10.4224 5.91436C11.4155 5.51678 12.5176 5.48593 13.5314 5.82735C14.5451 6.16877 15.404 6.86013 15.9542 7.77747C16.5044 8.69481 16.7098 9.77813 16.5336 10.8332C16.3574 11.8882 15.8111 12.846 14.9927 13.5348C16.0962 14.0338 17.0525 14.8087 17.7694 15.7848C17.9005 15.9654 17.9547 16.1906 17.9202 16.411C17.8856 16.6315 17.7652 16.8293 17.5852 16.9612Z"
                                  fill="#24292F"
                                />
                                <path
                                  d="M26.6833 17L29.9287 6.70625H32.4521L35.6974 17H33.9246L30.9795 7.76422H31.3655L28.4561 17H26.6833ZM28.4918 14.7697V13.1613H33.896V14.7697H28.4918ZM40.0851 17.2145C39.3751 17.2145 38.7555 17.0357 38.2265 16.6783C37.6976 16.3209 37.2877 15.8348 36.997 15.22C36.7063 14.6053 36.5609 13.9119 36.5609 13.1398C36.5609 12.3583 36.7063 11.6625 36.997 11.0525C37.2925 10.4377 37.7095 9.95402 38.248 9.60137C38.7865 9.24395 39.4203 9.06523 40.1495 9.06523C40.8834 9.06523 41.4981 9.24395 41.9938 9.60137C42.4942 9.95402 42.873 10.4377 43.1304 11.0525C43.3877 11.6673 43.5164 12.363 43.5164 13.1398C43.5164 13.9071 43.3877 14.6005 43.1304 15.22C42.873 15.8348 42.4894 16.3209 41.9795 16.6783C41.4695 17.0357 40.8381 17.2145 40.0851 17.2145ZM40.3496 15.6704C40.8119 15.6704 41.1836 15.5655 41.4648 15.3559C41.7507 15.1414 41.958 14.8436 42.0867 14.4623C42.2201 14.0811 42.2868 13.6402 42.2868 13.1398C42.2868 12.6347 42.2201 12.1939 42.0867 11.8174C41.958 11.4361 41.7555 11.1407 41.4791 10.931C41.2027 10.7165 40.8452 10.6093 40.4068 10.6093C39.9445 10.6093 39.5633 10.7237 39.2631 10.9524C38.9628 11.1764 38.7412 11.4814 38.5983 11.8674C38.4553 12.2487 38.3838 12.6728 38.3838 13.1398C38.3838 13.6116 38.4529 14.0405 38.5911 14.4266C38.7341 14.8078 38.9509 15.1104 39.2416 15.3344C39.5323 15.5584 39.9017 15.6704 40.3496 15.6704ZM42.2868 17V11.5815H42.0724V6.70625H43.8095V17H42.2868ZM48.909 17.2145C48.1989 17.2145 47.5794 17.0357 47.0504 16.6783C46.5214 16.3209 46.1116 15.8348 45.8209 15.22C45.5302 14.6053 45.3848 13.9119 45.3848 13.1398C45.3848 12.3583 45.5302 11.6625 45.8209 11.0525C46.1163 10.4377 46.5333 9.95402 47.0718 9.60137C47.6103 9.24395 48.2442 9.06523 48.9733 9.06523C49.7072 9.06523 50.322 9.24395 50.8176 9.60137C51.318 9.95402 51.6969 10.4377 51.9542 11.0525C52.2116 11.6673 52.3402 12.363 52.3402 13.1398C52.3402 13.9071 52.2116 14.6005 51.9542 15.22C51.6969 15.8348 51.3132 16.3209 50.8033 16.6783C50.2934 17.0357 49.662 17.2145 48.909 17.2145ZM49.1735 15.6704C49.6357 15.6704 50.0075 15.5655 50.2886 15.3559C50.5746 15.1414 50.7819 14.8436 50.9105 14.4623C51.044 14.0811 51.1107 13.6402 51.1107 13.1398C51.1107 12.6347 51.044 12.1939 50.9105 11.8174C50.7819 11.4361 50.5793 11.1407 50.3029 10.931C50.0265 10.7165 49.6691 10.6093 49.2307 10.6093C48.7684 10.6093 48.3871 10.7237 48.0869 10.9524C47.7867 11.1764 47.5651 11.4814 47.4221 11.8674C47.2791 12.2487 47.2077 12.6728 47.2077 13.1398C47.2077 13.6116 47.2768 14.0405 47.415 14.4266C47.5579 14.8078 47.7748 15.1104 48.0655 15.3344C48.3562 15.5584 48.7255 15.6704 49.1735 15.6704ZM51.1107 17V11.5815H50.8962V6.70625H52.6333V17H51.1107ZM66.7713 17V12.3106C66.7713 11.7816 66.6402 11.3694 66.3781 11.0739C66.116 10.7737 65.7609 10.6236 65.313 10.6236C65.0366 10.6236 64.7888 10.6879 64.5695 10.8166C64.3503 10.9405 64.1764 11.1264 64.0477 11.3742C63.919 11.6172 63.8547 11.9079 63.8547 12.2463L63.0898 11.7959C63.085 11.2622 63.2042 10.7928 63.4472 10.3877C63.695 9.97785 64.0286 9.65855 64.448 9.4298C64.8674 9.20105 65.3344 9.08668 65.8491 9.08668C66.7022 9.08668 67.355 9.34402 67.8078 9.85871C68.2653 10.3686 68.494 11.0406 68.494 11.8746V17H66.7713ZM57.4854 17V9.27969H59.008V11.6744H59.2225V17H57.4854ZM62.1391 17V12.3321C62.1391 11.7936 62.008 11.3742 61.7459 11.0739C61.4838 10.7737 61.1264 10.6236 60.6736 10.6236C60.2352 10.6236 59.8825 10.7737 59.6157 11.0739C59.3536 11.3742 59.2225 11.765 59.2225 12.2463L58.4505 11.7316C58.4505 11.2312 58.5744 10.7809 58.8222 10.3805C59.07 9.98023 59.4036 9.6657 59.823 9.43695C60.2471 9.20344 60.7213 9.08668 61.2455 9.08668C61.8222 9.08668 62.3035 9.21059 62.6895 9.4584C63.0803 9.70144 63.371 10.035 63.5616 10.4592C63.757 10.8786 63.8547 11.3527 63.8547 11.8817V17H62.1391ZM73.7428 17.2145C72.9612 17.2145 72.275 17.0453 71.684 16.7069C71.0931 16.3686 70.6308 15.8991 70.2972 15.2987C69.9684 14.6982 69.804 14.0072 69.804 13.2256C69.804 12.3821 69.966 11.6506 70.2901 11.0311C70.6141 10.4068 71.0645 9.92305 71.6411 9.57992C72.2178 9.2368 72.885 9.06523 73.6427 9.06523C74.4433 9.06523 75.1224 9.25348 75.68 9.62996C76.2423 10.0017 76.6593 10.5283 76.931 11.2098C77.2026 11.8912 77.3051 12.6943 77.2384 13.6188H75.5299V12.9897C75.5251 12.151 75.3774 11.5386 75.0867 11.1526C74.796 10.7666 74.3385 10.5736 73.7142 10.5736C73.0089 10.5736 72.4846 10.7928 72.1415 11.2312C71.7984 11.6649 71.6268 12.3011 71.6268 13.1398C71.6268 13.9214 71.7984 14.5266 72.1415 14.9555C72.4846 15.3845 72.985 15.5989 73.6427 15.5989C74.0668 15.5989 74.4314 15.506 74.7364 15.3201C75.0462 15.1295 75.2844 14.8555 75.4512 14.498L77.1526 15.0127C76.8571 15.7085 76.3996 16.2494 75.7801 16.6354C75.1653 17.0214 74.4862 17.2145 73.7428 17.2145ZM71.0835 13.6188V12.3178H76.3948V13.6188H71.0835ZM87.8954 17V12.3106C87.8954 11.7816 87.7644 11.3694 87.5023 11.0739C87.2402 10.7737 86.8851 10.6236 86.4372 10.6236C86.1608 10.6236 85.9129 10.6879 85.6937 10.8166C85.4745 10.9405 85.3006 11.1264 85.1719 11.3742C85.0432 11.6172 84.9789 11.9079 84.9789 12.2463L84.214 11.7959C84.2092 11.2622 84.3284 10.7928 84.5714 10.3877C84.8192 9.97785 85.1528 9.65855 85.5722 9.4298C85.9916 9.20105 86.4586 9.08668 86.9733 9.08668C87.8263 9.08668 88.4792 9.34402 88.932 9.85871C89.3895 10.3686 89.6182 11.0406 89.6182 11.8746V17H87.8954ZM78.6096 17V9.27969H80.1322V11.6744H80.3467V17H78.6096ZM83.2633 17V12.3321C83.2633 11.7936 83.1322 11.3742 82.8701 11.0739C82.608 10.7737 82.2506 10.6236 81.7978 10.6236C81.3594 10.6236 81.0067 10.7737 80.7399 11.0739C80.4777 11.3742 80.3467 11.765 80.3467 12.2463L79.5747 11.7316C79.5747 11.2312 79.6986 10.7809 79.9464 10.3805C80.1942 9.98023 80.5278 9.6657 80.9472 9.43695C81.3713 9.20344 81.8455 9.08668 82.3697 9.08668C82.9463 9.08668 83.4277 9.21059 83.8137 9.4584C84.2045 9.70144 84.4952 10.035 84.6858 10.4592C84.8812 10.8786 84.9789 11.3527 84.9789 11.8817V17H83.2633ZM95.1928 17.2145C94.4398 17.2145 93.8084 17.0357 93.2984 16.6783C92.7885 16.3209 92.4049 15.8348 92.1475 15.22C91.8902 14.6005 91.7615 13.9071 91.7615 13.1398C91.7615 12.363 91.8902 11.6673 92.1475 11.0525C92.4049 10.4377 92.7814 9.95402 93.277 9.60137C93.7774 9.24395 94.3945 9.06523 95.1284 9.06523C95.8576 9.06523 96.489 9.24395 97.0228 9.60137C97.5613 9.95402 97.9783 10.4377 98.2737 11.0525C98.5692 11.6625 98.7169 12.3583 98.7169 13.1398C98.7169 13.9119 98.5716 14.6053 98.2809 15.22C97.9902 15.8348 97.5803 16.3209 97.0514 16.6783C96.5224 17.0357 95.9028 17.2145 95.1928 17.2145ZM91.4684 17V6.70625H93.2055V11.5815H92.9911V17H91.4684ZM94.9283 15.6704C95.3762 15.6704 95.7456 15.5584 96.0363 15.3344C96.327 15.1104 96.5414 14.8078 96.6796 14.4266C96.8226 14.0405 96.8941 13.6116 96.8941 13.1398C96.8941 12.6728 96.8226 12.2487 96.6796 11.8674C96.5367 11.4814 96.3151 11.1764 96.0148 10.9524C95.7146 10.7237 95.3334 10.6093 94.8711 10.6093C94.4327 10.6093 94.0752 10.7165 93.7988 10.931C93.5224 11.1407 93.3175 11.4361 93.1841 11.8174C93.0554 12.1939 92.9911 12.6347 92.9911 13.1398C92.9911 13.6402 93.0554 14.0811 93.1841 14.4623C93.3175 14.8436 93.5248 15.1414 93.806 15.3559C94.0919 15.5655 94.466 15.6704 94.9283 15.6704ZM103.803 17.2145C103.021 17.2145 102.335 17.0453 101.744 16.7069C101.153 16.3686 100.691 15.8991 100.357 15.2987C100.028 14.6982 99.8637 14.0072 99.8637 13.2256C99.8637 12.3821 100.026 11.6506 100.35 11.0311C100.674 10.4068 101.124 9.92305 101.701 9.57992C102.278 9.2368 102.945 9.06523 103.702 9.06523C104.503 9.06523 105.182 9.25348 105.74 9.62996C106.302 10.0017 106.719 10.5283 106.991 11.2098C107.262 11.8912 107.365 12.6943 107.298 13.6188H105.59V12.9897C105.585 12.151 105.437 11.5386 105.146 11.1526C104.856 10.7666 104.398 10.5736 103.774 10.5736C103.069 10.5736 102.544 10.7928 102.201 11.2312C101.858 11.6649 101.687 12.3011 101.687 13.1398C101.687 13.9214 101.858 14.5266 102.201 14.9555C102.544 15.3845 103.045 15.5989 103.702 15.5989C104.127 15.5989 104.491 15.506 104.796 15.3201C105.106 15.1295 105.344 14.8555 105.511 14.498L107.212 15.0127C106.917 15.7085 106.459 16.2494 105.84 16.6354C105.225 17.0214 104.546 17.2145 103.803 17.2145ZM101.143 13.6188V12.3178H106.455V13.6188H101.143ZM108.893 17V9.27969H110.416V11.1597L110.23 10.9167C110.325 10.6593 110.451 10.4258 110.609 10.2161C110.771 10.0017 110.964 9.82535 111.188 9.68715C111.378 9.55848 111.588 9.4584 111.817 9.38691C112.05 9.31066 112.289 9.26539 112.532 9.25109C112.775 9.23203 113.011 9.24156 113.239 9.27969V10.8881C113.011 10.8214 112.746 10.7999 112.446 10.8237C112.15 10.8476 111.884 10.931 111.645 11.0739C111.407 11.2026 111.212 11.367 111.059 11.5672C110.911 11.7673 110.802 11.9961 110.73 12.2534C110.659 12.506 110.623 12.78 110.623 13.0755V17H108.893Z"
                                  fill="#24292F"
                                />
                              </g> */
}
