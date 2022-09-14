using System;
using NBitcoin;

namespace _125350929
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World! " + new Key().GetWif(Network.Main));
        }
    }
}

//Generating a public key with NBitcoin
// Key privateKey = new Key();
//One-way Cryptographic function to generate a public key 
// Pubkey publickey = privateKey.Pubkey
//You can now acquire your Bitcoin Address from your public key
// Console.WriteLine(publicKey.GetAddress(ScriptPubKeyType.Legacy, Network.Main)); // 1PUYsjwfNmX64wS368ZR5FMouTtUmvtmTY
// Console.WriteLine(publicKey.GetAddress(ScriptPubKeyType.Legacy, Network.TestNet)
