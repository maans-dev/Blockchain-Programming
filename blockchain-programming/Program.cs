using System;
using NBitcoin;

namespace _125350929
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World! " + new Key().GetWif(Network.Main));
            var publicKeyHash = new KeyId("14836dbe7f38c5ac3d49e8d790af808a4ee9edcf");

            var testNetAddress = publicKeyHash.GetAddress(Network.TestNet);
            var mainNetAddress = publicKeyHash.GetAddress(Network.Main);

            Console.WriteLine(mainNetAddress.ScriptPubKey);         
        }
    }
}

//Generating a private key with NBitcoin, used to send bitcoins
// Key privateKey = new Key();
//One-way Cryptographic function to generate a public key 
// Pubkey publickey = privateKey.Pubkey
//You can now acquire your Bitcoin Address from your public key and network to be used.
// Console.WriteLine(publicKey.GetAddress(ScriptPubKeyType.Legacy, Network.Main)); // 1PUYsjwfNmX64wS368ZR5FMouTtUmvtmTY
// Console.WriteLine(publicKey.GetAddress(ScriptPubKeyType.Legacy, Network.TestNet)
