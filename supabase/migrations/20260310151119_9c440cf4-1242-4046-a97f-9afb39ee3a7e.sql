
-- Create enums
CREATE TYPE public.gudstjanst_kategori AS ENUM ('söndagsmässa', 'vardagsmässa', 'andakt', 'högtid');
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create tables
CREATE TABLE public.gudstjanster (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  datum DATE NOT NULL,
  tid TIME NOT NULL,
  typ TEXT NOT NULL,
  kategori gudstjanst_kategori NOT NULL,
  celebrant TEXT,
  notering TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.nyheter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titel TEXT NOT NULL,
  innehall TEXT NOT NULL,
  publicerad DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.gudstjanster ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nyheter ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Public read policies (no function needed)
CREATE POLICY "Anyone can view gudstjanster" ON public.gudstjanster FOR SELECT USING (true);
CREATE POLICY "Anyone can view nyheter" ON public.nyheter FOR SELECT USING (true);

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin write policies for gudstjanster
CREATE POLICY "Admins can insert gudstjanster" ON public.gudstjanster FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gudstjanster" ON public.gudstjanster FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gudstjanster" ON public.gudstjanster FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin write policies for nyheter
CREATE POLICY "Admins can insert nyheter" ON public.nyheter FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update nyheter" ON public.nyheter FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete nyheter" ON public.nyheter FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin view roles
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
