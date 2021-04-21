const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact us</h1>
      <form>
        <fieldset>
          <div>
            <label>Name</label>
            <input name="name" />
          </div>
          <div>
            <label>Email</label>
            <input name="email" />
          </div>
          <div>
            <label>Subject</label>
            <input name="subject" />
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
