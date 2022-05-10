export const connectConfluxWallet = async () => {
    if (typeof window.conflux !== 'undefined') {

        // Conflux user detected. You can now use the provider.
        const conflux = window['conflux']
        try {
            const accounts = await conflux.enable()
            // You now have an array of accounts!
            // Currently only ever one:
            // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
            const obj = {
                status: "👆🏽 Write a message in the text-field above.",
                address: accounts[0],
            };
            return obj;

        } catch (error) {
            // Handle error. Likely the user rejected the login
            console.error(error)
        }
    }
    else {
        return {
            address: "",
            status: (
                <span>
                    <p className="mt-2">
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Conflux Portal, a virtual Conflux wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (typeof window.conflux !== 'undefined') {

        // Conflux user detected. You can now use the provider.
        const conflux = window['conflux']
        try {
            const accounts = await conflux.enable()
            // You now have an array of accounts!
            // Currently only ever one:
            // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
            if (accounts.length > 0) {
                return {
                    address: accounts[0],
                    status: "👆🏽 Write a message in the text-field above.",
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Conflux Portal using the top right button.",
                };
            }

        } catch (error) {
            // Handle error. Likely the user rejected the login
            console.error(error)
        }
    }
    else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Conflux Portal, a virtual Conflux wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};
 