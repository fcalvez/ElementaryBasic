using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicEngine.Elements
{
    public abstract class Element
    {
        public abstract void Eval(string text);
        public abstract bool IsMatch(string text);
    }
}
