using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicEngine
{
    public interface IBasicEngine
    {
        void Out(string text);
        void Error(string text);
        bool RunCommand(string text);
    }
}
