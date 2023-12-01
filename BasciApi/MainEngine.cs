using BasicEngine;
using BasicEngine.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicEngine
{
    public class MainEngine : IBasicEngine
    {
        List<Command> _commands = new List<Command>();

        public MainEngine()
        {
            _commands.Add(new PrintCommand(this));
        }

        public void Error(string text)
        {
            Console.Write("Error : " + text);
        }

        public void Out(string text)
        {
            Console.Write(text);
        }

        public bool RunCommand(string text)
        {
            bool result = false;
            foreach (Command c in _commands)
            {
                if (c.IsMatch(text))
                    result = c.Execute(text);
            }
            return result;
        }
    }
}
