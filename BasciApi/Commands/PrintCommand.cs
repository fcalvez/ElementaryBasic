using BasicEngine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicEngine.Commands
{
    class PrintCommand : Command
    {
        const string _command = "print";
        IBasicEngine _engine;

        public PrintCommand(IBasicEngine engine)
        {
            _engine = engine;
        }

        public override bool Execute(string text)
        {
            ExtractFirstWord(ref text); // print
            _engine.Out(text.TrimStart(' '));
            return true;
        }
        public override bool IsMatch(string text)
        {
            return text.StartsWith(_command + " ", StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
