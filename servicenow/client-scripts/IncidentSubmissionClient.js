function onSubmit() {
  if (!g_form.getValue('short_description') || !g_form.getValue('description'))
    return false;
  return true;
}
