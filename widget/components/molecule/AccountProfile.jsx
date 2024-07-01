let {
  accountId,
  blockHeight,
  blockTimestamp,
  profile,
  verifications,
  showFlagAccountFeature,
} = props;

accountId = accountId || context.accountId;
showFlagAccountFeature = showFlagAccountFeature ?? false;
profile = profile || Social.get(`${accountId}/profile/**`, "final");

const profileUrl = `https://app.potlock.org/?tab=profile&accountId=${accountId}`

const Wrapper = styled.a`
  display: inline-grid;
  width: 100%;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  cursor: pointer;
  margin: 0;
  color: #687076 !important;
  outline: none;
  text-decoration: none !important;
  background: none !important;
  border: none;
  text-align: left;
  padding: 0;

  > * {
    min-width: 0;
  }

  &:hover,
  &:focus {
    div:first-child {
      border-color: #d0d5dd;
    }
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "10px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap !important;
`;

const Avatar = styled.div`
  width: ${props.avatarSize || "40px"};
  height: ${props.avatarSize || "40px"};
  flex-shrink: 0;
  border: 1px solid #eceef0;
  overflow: hidden;
  border-radius: 40px;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
`;

const VerifiedBadge = styled.div`
  position: absolute;
  left: 24px;
  top: 22px;
`;

const Name = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const AccountProfile = (
  <Wrapper
    href={!props.onClick && profileUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Avatar>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: profile.image,
          alt: profile.name,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        }}
      />
    </Avatar>

    {verifications && (
      <VerifiedBadge>
        <Widget
          src="near/widget/Settings.Identity.Verifications.Icon"
          props={{ type: "base" }}
        />
      </VerifiedBadge>
    )}

    <div>
      <div>
        <div>{profile.name || accountId.split(".near")[0]}</div>

        {props.inlineContent}

        {props.blockHeight && (
          <div style={{ marginLeft: "auto" }}>
            Joined{" "}
            <Widget
              src="near/widget/TimeAgo"
              props={{ blockHeight, blockTimestamp }}
            />
            ago
          </div>
        )}
      </div>

      {!props.hideAccountId && <div>@{accountId}</div>}
    </div>
  </Wrapper>
);

if (props.noOverlay) return AccountProfile;

return (
  <div>dfdsfs</div>
  //   <Widget
  //     src="near/widget/AccountProfileOverlay"
  //     props={{
  //       accountId,
  //       profile,
  //       children: AccountProfile,
  //       placement: props.overlayPlacement,
  //       verifications,
  //       showFlagAccountFeature,
  //     }}
  //   />
);
