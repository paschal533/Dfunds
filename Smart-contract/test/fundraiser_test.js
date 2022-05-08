const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", accounts => {
  let fundraiser;
  const name = "custodian name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekikken.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = accounts[1];
  const owner = accounts[0];

  beforeEach ( async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      owner
    );
  });

  describe("initialization", () => {
    it("gets the beneficiary name", async () => {
      const actaul = await fundraiser.name();
      assert.equal(actaul, name, "name should match");
    });

    it("gets the beneficiary url", async () => {
      const actaul = await fundraiser.url();
      assert.equal(actaul, url, "url should match");
    });

    it("gets the beneficiary imageURL", async () => {
      const actaul = await fundraiser.imageURL();
      assert.equal(actaul, imageURL, "imageURL should match");
    });

    it("gets the beneficiary description", async () => {
      const actaul = await fundraiser.description();
      assert.equal(actaul, description, "description should match");
    });

    it("gets the beneficiary", async () => {
      const actaul = await fundraiser.beneficiary();
      assert.equal(actaul, beneficiary, "beneficiary should match");
    });

    it("gets the owner", async () => {
      const actaul = await fundraiser.owner();
      assert.equal(actaul, owner, "owner should match");
    });
  });

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2];

    it("update beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, {from: owner});
      const actualBeneficiary = await fundraiser.beneficiary();
      assert.equal(actualBeneficiary, newBeneficiary, "beneficiary should match");
    });

    it("throws an error when called from a non-owner account", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, {from: accounts[3]});
        assert.fail("withdraw was not restricted to owners")
      } catch(err) {
        const expectedError = "Ownable: caller is not the owner"
        const actualError = err.reason;
        assert.equal(actualError, expectedError, "should not be permitted")
      }
    })
  })

  describe("making donations", () => {
    const value = web3.utils.toWei("0.0289");
    const donor = accounts[2];

    it("increase myDonationsCount", async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({from: donor});

      await fundraiser.donate({from: donor, value});

      const newDonationsCount = await fundraiser.myDonationsCount({from: donor});

      assert.equal(1, newDonationsCount - currentDonationsCount, "myDonationsCount should increment by 1");
    });
    it("includes donation in myDonations", async () => {
      await fundraiser.donate({from: donor, value});
      const {values, dates} = await fundraiser.myDonations({from: donor});

      assert.equal(value, values[0], "values should match");
      assert(dates[0], "date should be present");
    })

    it("increases the totalDonations amount", async () => {
      const currentTotalDonations = await fundraiser.totalDonations();
      await fundraiser.donate({from: donor, value});
      const newTotalDonations = await fundraiser.totalDonations();

      const diff = newTotalDonations - currentTotalDonations;

      assert.equal(
        diff, 
        value,
        "difference should match the donation value"
      )
    });

    it("increases donationsCount", async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await fundraiser.donate({from: donor, value});
      const newDonationsCount = await fundraiser.donationsCount();

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "donationsCounts should increment by 1"
      );
    })

    it("emits the DonationReceived Event", async () => {
      const tx = await fundraiser.donate({from: donor, value});
      const expectedEvent = "DonationReceived";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });
  });

  describe("withdrawing funds", () => {
    beforeEach(async () => {
      await fundraiser.donate(
        {from: accounts[2], value: web3.utils.toWei('0.1')}
      );
    });

    describe("access controls", () => {
      it("throws an error when called from a non-onwer account", async () => {
        try {
          await fundraiser.withdraw({from: accounts[3]});
          assert.fail("withdraw was not restricted to owner")
        } catch(err) {
          const expectedError = "Ownable: caller is not the owner"
          const actualError = err.reason;
          assert.equal(actualError, expectedError, "should not be permitted")
        }
      });

      it("permits the owner to call the funtion", async () => {
        try {
          await fundraiser.withdraw({from: owner});
          assert(true, "no errors were thrown");
        } catch(err) {
          assert.fail("should not have thrown an error");
        }
      });

      it("transfer balance to beneficiary", async () => {
        const currentContractBalance = await web3.eth.getBalance(fundraiser.address);
        const currentBeneficiaryBalance = await web3.eth.getBalance(beneficiary);

        await fundraiser.withdraw({from: owner});

        const newContractBalance = await web3.eth.getBalance(fundraiser.address);
        const newBeneficiaryBalance = await web3.eth.getBalance(beneficiary);
        const beneficiaryDifference = newBeneficiaryBalance - currentBeneficiaryBalance;

        assert.equal(
          beneficiaryDifference,
          currentContractBalance,
          "beneficiary should receive all the funds"
        )
      });

      it("emits withdraw event", async () => {
        const tx = await fundraiser.withdraw({from: owner});
        const expertedEvent = "Withdraw";
        const actualEvent = tx.logs[0].event;

        assert.equal(
          actualEvent,
          expertedEvent,
          "events should match"
        );
      });
    });
  });

  describe("fallback function", () => {
    const value = web3.utils.toWei('0.0209');

    it("increases the totalDonations amount", async () => {
      const currentTotalDonation = await fundraiser.totalDonations();
      await web3.eth.sendTransaction(
        {to: fundraiser.address, from: accounts[9], value}
      );
      const newTotalDonations = await fundraiser.totalDonations();

      const diff = newTotalDonations - currentTotalDonation;

      assert.equal(
        diff,
        value,
        "difference should match the donation value"
      )
    });

    it("increases dontionsCount", async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await web3.eth.sendTransaction(
        {to: fundraiser.address, from: accounts[9], value}
      );
      const newDonationsCount = await fundraiser.donationsCount();

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "donationsCount should increment by 1"
      );
    });
  });
});
