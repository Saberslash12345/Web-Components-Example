import { Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;
  buttonText = "Web component button :)"

  @State() title = 'WebComponents Title';
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;
  @Prop({ reflectToAttr: true, mutable: true }) onData: Function;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  triggerData() {
    // todo do something, even async
    setTimeout(
      () => { this.onData('Hello from WebComponent!'); },
      1000,
    );
  }

  @Method()
  open() {
    this.opened = true;
  }

  @Method()
  setTitle(title: string) {
    this.title = title;
  }

  @Method()
  getButtonName(callback) {
    callback(this.buttonText);
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 49802384032</li>
            <li>
              E-Mail:
              <a href="mailto:something@something.com">
                something@something.com
              </a>
            </li>
          </ul>
          <button class="data-button" onClick={this.triggerData.bind(this)}>Get Data</button>
        </div>
      );
    }
    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>
    ];
  }
}
