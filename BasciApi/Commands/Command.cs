using BasicEngine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace BasicEngine.Commands
{
    public abstract class Command
    {
        static Regex regWord = new Regex(@"(\w+)");

        MainEngine Engine { get; set; }

        public abstract bool Execute(string text);
        public abstract bool IsMatch(string text);

        protected static string ExtractFirstWord(ref string text)
        {
            string result = string.Empty;
            if (regWord.IsMatch(text))
            {
                result = regWord.Match(text).Groups[1].Value;
            }
            text = text.Substring(result.Length);
            return result;
        }
    }
}
