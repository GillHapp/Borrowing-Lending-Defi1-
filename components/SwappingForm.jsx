import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import contractabi from "./abi.json";



const contractAddress = "0x6482220f77fC720b93846fA85D5fe3B58E0aC27a";

const tokens = [
    { symbol: 'ETH', address: ethers.constants.AddressZero },  // ETH can be represented by AddressZero for simplicity
    { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' }  // DAI token address
];

export default function TokenSwapForm() {
    const [fromToken, setFromToken] = useState(tokens[0].symbol);
    const [toToken, setToToken] = useState(tokens[1].symbol);
    const [amount, setAmount] = useState('');
    const [estimatedOutput, setEstimatedOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSwap = useCallback(async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractabi, signer);


        const destinationChainSelector = 1002;
        const destinationTokenAddress = ethers.utils.hexZeroPad("0x13630b806086058EeAc26Af04c4528761e4DC389", 32); // Convert destination token address to 32-byte hex
        const recipient = ethers.utils.hexZeroPad(await signer.getAddress(), 32);  // Convert recipient address to 32-byte hex
        const amountInWei = ethers.utils.parseEther(amount);


        const sourceTokenAddress = tokens.find(token => token.symbol === fromToken)?.address || ethers.constants.AddressZero;

        setLoading(true);
        setError('');

        try {
            const tx = await contract.swap(destinationChainSelector, destinationTokenAddress, recipient, sourceTokenAddress, amountInWei, {
                gasLimit: 500000
            });

            console.log('Transaction sent:', tx);

            const receipt = await tx.wait();
            console.log('Transaction confirmed:', receipt);
            alert('Swap successful!');
        } catch (error) {
            console.error('Error during swap:', error);
            setError('Swap failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [fromToken, toToken, amount]);

    const handleUserInput = useCallback((value) => {
        setAmount(value);
        setEstimatedOutput(value ? (parseFloat(value) * 0.98).toFixed(6) : '');
    }, []);

    const handleReverse = useCallback(() => {
        setFromToken(toToken);
        setToToken(fromToken);
        setAmount(estimatedOutput);
        setEstimatedOutput(amount);
    }, [fromToken, toToken, amount, estimatedOutput]);

    return (
        <div style={{ margin: '0 auto', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: "white" }}>
            <h2 style={{ textAlign: 'center' }}>Swap Tokens</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>Exchange your EVM-based tokens</p>

            <div style={{ marginBottom: '20px' }}>
                <label>From</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => handleUserInput(e.target.value)}
                        style={{ flexGrow: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        disabled={loading}
                    />
                    <select
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {tokens.map((token) => (
                            <option key={token.symbol} value={token.symbol}>
                                {token.symbol}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={handleReverse}
                style={{ display: 'block', margin: '10px auto', padding: '5px', border: 'none', background: 'none', cursor: 'pointer' }}
                disabled={loading}
            >
                ⇅ Switch Token
            </button>

            <div style={{ marginBottom: '20px' }}>
                <label>To (estimated)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="0.0"
                        value={estimatedOutput}
                        readOnly
                        style={{ flexGrow: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <select
                        value={toToken}
                        onChange={(e) => setToToken(e.target.value)}
                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {tokens.map((token) => (
                            <option key={token.symbol} value={token.symbol}>
                                {token.symbol}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button
                onClick={handleSwap}
                style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                disabled={loading}
            >
                {loading ? 'Swapping...' : 'Swap'}
            </button>
        </div>
    );
}
