using BasicEngine;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            IBasicEngine api = new MainEngine();

            var code = File.ReadLines(args[0]);

            foreach(var line in code)
            {
                api.RunCommand(line);
            }

            Console.ReadKey();
        }
    }
}
